import mimetypes
import os
from models import supabase_service
from app.celery import celery
import logging


@celery.task(name="tasks.upload_clips_task")
def upload_clips_task(username, str_data_dict, file_data_dict):
    """
    Celery background task for handling file uploads.
    """
    try:
        temp_dir = "tmp/"  # Ensure temp directory is consistent across environments.

        # Process string data
        for key, value in str_data_dict.items():
            if key != 'uname' and isinstance(value, str):
                update_supabase_field("Loadouts", key, value, username)
            else:
                log_error(f"Invalid value type for key {key}: {type(value)}")

        # Process file uploads
        for key, file_path in file_data_dict.items():
            if os.path.exists(file_path):
                bucket = 'member_clips'
                filename = f'{username}_{key}'
                pub_url = upload_clip_to_supabase(file_path, bucket, filename)

                if pub_url:
                    update_supabase_field("Loadouts", key, pub_url, username)
                else:
                    log_error(f"Failed to upload file: {file_path}")

                # Remove temporary file
                os.remove(file_path)
            else:
                log_error(f"Temporary file not found: {file_path}")

        return {"status": "success"}
    except Exception as e:
        log_error(f"Error in upload_clips_task: {str(e)}")
        return {"status": "error", "message": str(e)}


def upload_clip_to_supabase(local_file_path, bucket, filename_no_ext):
    """
    Upload a file to Supabase storage and return its public URL.
    """
    mime_type, _ = mimetypes.guess_type(local_file_path)
    extension = mimetypes.guess_extension(mime_type)
    filename_full = f'{filename_no_ext}{extension}'

    try:
        location = supabase_service.storage.from_(bucket).get_public_url(filename_full)
        if location:
            supabase_service.storage.from_(bucket).remove(filename_full)
    except Exception as e:
        log_error(f"Error checking existing file in Supabase: {e}")

    try:
        with open(local_file_path, 'rb') as f:
            supabase_service.storage.from_(bucket).upload(filename_full, f, {"content-type": mime_type})
        return supabase_service.storage.from_(bucket).get_public_url(filename_full)
    except Exception as e:
        log_error(f"Error uploading file to Supabase: {e}")
        return None


def update_supabase_field(table, field, value, username):
    """
    Update a specific field in a Supabase table.
    """
    try:
        supabase_service.table(table).update({field: value}).eq("name", username).execute()
    except Exception as e:
        log_error(f"Error updating Supabase field '{field}' for user '{username}': {e}")


def log_error(message):
    """
    Log errors to the current Flask app logger or the root logger.
    """
    try:
        from flask import current_app
        current_app.logger.error(message)
    except RuntimeError:
        logging.error(message)


@celery.task(name="tasks.print_test_task")
def print_test_task(username, str_data, file_paths):
    """
    Test task to validate Celery worker communication.
    """
    print(f"Processing test task for user {username}")
