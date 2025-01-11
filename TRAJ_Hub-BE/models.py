from flask_login import UserMixin
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv()

weapon_api_key = os.getenv('API_KEY')
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')
supabase_service_role_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

supabase: Client = create_client(supabase_url, supabase_key)
supabase_service: Client = create_client(supabase_url, supabase_service_role_key)

senderemail = os.getenv('EMAIL')
email_password = os.getenv('EMAIL_PASSWORD')

class User(UserMixin):
    def __init__(self, username):
        self.id = username

    @staticmethod
    def get(username):
        response = supabase_service.from_('User').select('*').eq('username', username).execute()
        if response.data:
            user_data = response.data[0]
            user = User(username)
            return user, user_data
        return None, None