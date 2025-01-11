from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND")

def create_celery_app(flask_app=None):
    """Create and configure the Celery app."""
    celery_app = Celery(
        flask_app.import_name if flask_app else "app",
        broker=CELERY_BROKER_URL,
        backend=CELERY_RESULT_BACKEND,
    )
    celery_app.conf.update(
        task_default_queue="default",
        task_acks_late=True,
        worker_prefetch_multiplier=1,
        broker_heartbeat=0,
        broker_pool_limit=None,
        broker_connection_retry_on_startup=True,
        include=["app.main.tasks"],
    )

    if flask_app:
        celery_app.conf.update(flask_app.config)
        TaskBase = celery_app.Task

        class ContextTask(TaskBase):
            def __call__(self, *args, **kwargs):
                with flask_app.app_context():
                    return self.run(*args, **kwargs)

        celery_app.Task = ContextTask

    return celery_app

celery = create_celery_app()
