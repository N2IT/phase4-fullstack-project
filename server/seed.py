from config import app, db
from random import randint, choice as rc, choices
from datetime import datetime
from faker import Faker
from models import Account, User, Role, Permission, role_permissions

fake = Faker()
status_list = ['active', 'inactive']
roles = [1, 2, 3]

def create_accounts():
  accounts = []
  for _ in range(10):
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
      # updated_at = datetime.now(),
      status = choices(status_list, weights = [10, 1], k=1)[0]
    )
  
    accounts.append(a)

  return accounts


def create_users():

  users = []
  for _ in range(20):
    u = User(
      first_name = fake.first_name(),
      last_name = fake.last_name(),
      email = fake.profile(fields=['mail'])['mail'],
      username=fake.profile(fields=['username'])['username'],
      created_at = datetime.now(),
      # updated_at = datetime.now(),
      status = choices(status_list, weights = [10, 1], k=1)[0],
      role_id = choices(roles, weights = [1, 5, 10], k=1)[0],
      account_id = rc([account.id for account in accounts]),
    )

    u.password_hash = fake.password(length=7, special_chars=False, upper_case=False)
  
    users.append(u)

  return users

def create_roles():
  role0=Role(title="admin")
  role1=Role(title="manager")
  role2=Role(title="sales")


if __name__ == "__main__":
  with app.app_context():
    print("Clearing db...")
    db.session.query(role_permissions).delete()
    db.session.commit()
    Account.query.delete()
    User.query.delete()
    Role.query.delete()
    Permission.query.delete()

    print("Seeding accounts...")
    accounts = create_accounts()
    db.session.add_all(accounts)
    db.session.commit()

    print('Seeding users...')
    users = create_users()
    db.session.add_all(users)
    db.session.commit()

    print('Creating Roles...')
    role0=Role(title="admin")
    role1=Role(title="manager")
    role2=Role(title="sales")

    db.session.add_all([role0, role1, role2])
    db.session.commit()

    print('Creating Permissions...')
    p0 = Permission(name="create_account", description='agent can create a new account')
    p1 = Permission(name="read_account", description='agent can read an account page')
    p2 = Permission(name="update_account", description='agent can edit an account')
    p3 = Permission(name="delete_account", description='agent can delete an account')
    p4 = Permission(name="create_user", description='agent can create a new user')
    p5 = Permission(name="read_user", description='agent can read a user profile')
    p6 = Permission(name="update_user", description='agent can edit a user')
    p7 = Permission(name="delete_user", description='agent can delete a user')
    p8 = Permission(name='create_quote', description='agent can create a new quote')
    p9 = Permission(name='read_quote', description='agent can read a quote')
    p10 = Permission(name='update_quote', description='agent can edit a quote')
    p11 = Permission(name='delete_quote', description='agent can delete a quote')

    db.session.add_all([p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11])
    db.session.commit()

    print('Appending role_permissions...')
    print('Adding role_permissions to role0...')
    role0.permissions.append(p0)
    role0.permissions.append(p1)
    role0.permissions.append(p2)
    role0.permissions.append(p3)
    role0.permissions.append(p4)
    role0.permissions.append(p5)
    role0.permissions.append(p6)
    role0.permissions.append(p7)
    role0.permissions.append(p8)
    role0.permissions.append(p9)
    role0.permissions.append(p10)
    role0.permissions.append(p11)

    print('Adding role_permissions to role1...')
    role1.permissions.append(p1)
    role1.permissions.append(p4)
    role1.permissions.append(p5)
    role1.permissions.append(p6)
    role1.permissions.append(p8)
    role1.permissions.append(p9)
    role1.permissions.append(p10)

    print('Adding role_permissions to role2...')
    role2.permissions.append(p1)
    role2.permissions.append(p5)
    role2.permissions.append(p6)
    role2.permissions.append(p8)
    role2.permissions.append(p9)
    role2.permissions.append(p10)

    print('Appending role_permissions...')
    p0.roles.append(role0)
    p1.roles.append(role0)
    p2.roles.append(role0)
    p3.roles.append(role0)
    p4.roles.append(role0)
    p5.roles.append(role0)
    p6.roles.append(role0)
    p7.roles.append(role0)
    p8.roles.append(role0)
    p9.roles.append(role0)
    p10.roles.append(role0)
    p11.roles.append(role0)

    p1.roles.append(role1)
    p4.roles.append(role1)
    p5.roles.append(role1)
    p6.roles.append(role1)
    p8.roles.append(role1)
    p9.roles.append(role1)
    p10.roles.append(role1)

    p1.roles.append(role2)
    p5.roles.append(role2)
    p6.roles.append(role2)
    p8.roles.append(role2)
    p9.roles.append(role2)
    p10.roles.append(role2)

    db.session.commit()

    print('done seeding')
