from config import app, db
from random import randint, choice as rc
from datetime import datetime
from faker import Faker
from models import Account, User

fake = Faker()

def create_accounts():
  accounts = []
  for _ in range(20):
    a = Account(
      account_number = rc(range(0, 1000)),
      company_name = fake.company(),
      address_1 = fake.street_address(),
      address_2 = fake.building_number(),
      city = fake.city(),
      state = fake.state(),
      zip_code = fake.postcode(),
      phone = fake.phone_number(),
      discount = rc(range(25, 50)),
      markup_variable = rc(range(1, 2)),
      created_at = datetime.now(),
      updated_at = datetime.now()
    )
  
    accounts.append(a)

  return accounts


def create_users():
  users = []
  for _ in range(50):
    u = User(
      first_name = fake.first_name(),
      last_name = fake.last_name(),
      username=fake.profile(fields=['username'])['username'],
      created_at = datetime.now(),
      updated_at = datetime.now(),
      status = fake.boolean(chance_of_getting_true=75),
      account_id = rc([account.id for account in accounts])
    )
  
    users.append(u)

  return users


if __name__ == "__main__":
  with app.app_context():
    print("Clearing db...")
    Account.query.delete()

    print("Seeding accounts...")
    accounts = create_accounts()
    db.session.add_all(accounts)
    db.session.commit()

    print('Seeding users...')
    users = create_users()
    db.session.add_all(users)
    db.session.commit()

    print('done seeding')
