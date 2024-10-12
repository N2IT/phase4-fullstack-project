from flask_mail import Mail, Message
from config import app
import os
from concurrent.futures import ThreadPoolExecutor

# pull from .env file
app.config['MAIL_SERVER'] = os.getenv("EMAIL_SERVER")
app.config['MAIL_PORT'] = int(os.getenv("EMAIL_PORT"))
app.config['MAIL_USE_TLS'] = os.getenv("EMAIL_USE_TLS") == 'True'
app.config['MAIL_USE_SSL'] = os.getenv("EMAIL_USE_SSL") == 'True'
app.config['MAIL_USERNAME'] = os.getenv("EMAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("EMAIL_PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("EMAIL_USERNAME")

mail = Mail(app)
executor = ThreadPoolExecutor()

def send_mail(recipients, subject, html_body, attachments=None):
    def send_email():
        try:
            with app.app_context():
                
                print("Sending email")
                msg = Message(
                    subject=subject,
                    recipients=recipients,
                    html=html_body,
                )
                mail.send(msg)
                print("Email sent")
        except Exception as e:
            print("Failed to send email", str(e))
    
    executor.submit(send_email)