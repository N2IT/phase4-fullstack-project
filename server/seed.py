from config import app, db
from random import randint, choice as rc
from faker import Faker
# from models import Account, User


if __name__ == "__main__":
  with app.app_context():
    print("Starting seed...")

