from flask import Blueprint, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from models import senderemail, email_password

profileEmail_bp = Blueprint('email',__name__)

@profileEmail_bp.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'message': 'All fields are required'}), 400

    sender_email = senderemail
    receiver_email = senderemail
    password = email_password

    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = 'New message from profile page'

        body = f"""
        Name: {name}
        Email: {email}

        Message:
        {message}
        """
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())

        return jsonify({'message': 'Email sent successfully!'}), 200

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'message': 'Failed to send email. Please try again later.'}), 500