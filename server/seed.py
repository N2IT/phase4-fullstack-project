from config import app, db, func
from random import randint, choice as rc, choices
from datetime import datetime
from faker import Faker
from models import * 


fake = Faker()
status_list = ['active', 'inactive']
roles = [1, 2, 3, 4]

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
      discount = randint(0, 45) / 100.0,
      created_by = 1,
      created_at = datetime.now(),
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
      created_by = 1,
      created_at = datetime.now(),
      status = choices(status_list, weights = [10, 1], k=1)[0],
      role_id = choices(roles, weights = [1, 5, 10, 2], k=1)[0],
      account_id = rc([account.id for account in accounts]),
    )

    u.password_hash = fake.password(length=7, special_chars=False, upper_case=False)
  
    users.append(u)

  return users

def create_customers():
  customers = []
  for _ in range(20):
    c = Customer(
      first_name = fake.first_name(),
      last_name = fake.last_name(),
      email = fake.profile(fields=['mail'])['mail'],
      phone = fake.phone_number(),
      address_1 = fake.street_address(),
      address_2 = fake.building_number(),
      city = fake.city(),
      state = fake.state(),
      zip_code = fake.postcode(),
      created_at = datetime.now(),
      created_by = 1,
      notes = fake.text(),
      account_id = rc([account.id for account in accounts]),
      status = choices(status_list, weights = [10, 1], k=1)[0],
    )

    customers.append(c)

  return customers
  
def create_quotes():
  quotes = []
  customer_account_data = {
        customer.id: {
            'account_id': customer.account.id,
            'discount': customer.account.discount,
        }
        for customer in customers if customer.account
    }

  for _ in range(30):
    selected_customer_id = rc(list(customer_account_data.keys()))
    account_data = customer_account_data[selected_customer_id]

    q = Quote(
        quote_number=rc(range(0, 1000)),
        title=fake.name(),
        customer_id=selected_customer_id,
        account_id=account_data['account_id'],
        discount=account_data['discount'],
        markup_variable= 2,
        notes=fake.sentence(),
        status = choices(status_list, weights = [10, 1], k=1)[0],
        converted='No',
        created_at=datetime.now(),
        created_by = 1,
    )

    quotes.append(q)
  
  return quotes

def create_configurations():
  configurations = []

  for _ in range(35):
    cost = randint(3500, 1000000) / 100.0
    configs = Configuration(
      sku = fake.ean(length=8),
      product_title = fake.company_suffix(),
      product_description = fake.sentence(),
      cost = cost,      
      quote_id = rc([quote.id for quote in quotes]),
      created_by = 1,
    )

    configurations.append(configs)
  
  return configurations

def calculate_quote_info(quote_id=None):
  quote = Quote.query.filter(Quote.id == quote_id).first()
  if quote_id and not quote.configurations:
    quote.total_cost = None
    quote.savings = None
    quote.sale_price = None
    quote.margin_percentage = None
    quote.margin_dollars = None

    db.session.add(quote)
    
  else:
    total_costs = db.session.query(
        Configuration.quote_id,
        func.sum(Configuration.cost).label('total_cost')
    ).group_by(Configuration.quote_id).all()

    

    for total_cost_data in total_costs:
        quote_id = total_cost_data.quote_id
        total_cost = total_cost_data.total_cost

        # Fetch the corresponding quote
        quote = db.session.get(Quote, quote_id)
        # Assign misc variables associated to calculations
        cost_w_savings = total_cost - (total_cost * quote.discount)

        # Calculate the financial metrics
        quote.total_cost = total_cost
        quote.savings = total_cost * quote.discount
        quote.sale_price = cost_w_savings * quote.markup_variable
        quote.margin_percentage = ((quote.sale_price - cost_w_savings) / cost_w_savings)
        quote.margin_dollars = quote.sale_price - cost_w_savings

        db.session.add(quote)
    
  db.session.commit()

def update_quote_discount(discount, id):
  quote = Quote.query.filter(Quote.account_id == id).first()
  quote.discount = discount
  
  db.session.commit()
  

if __name__ == "__main__":
  with app.app_context():
    print("Clearing db...")
    db.session.commit()
    Account.query.delete()
    User.query.delete()
    RolePermission.query.delete()
    Role.query.delete()
    Permission.query.delete()
    Customer.query.delete()
    Configuration.query.delete()
    Quote.query.delete()

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
    role3=Role(title="guest")

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

    print('Appending roles_permissions...')
    print('Adding roles_permissions to admin...')

    rp0 = RolePermission(role = role0, permission = p0)
    rp1 = RolePermission(role = role0, permission = p1)
    rp2 = RolePermission(role = role0, permission = p2)
    rp3 = RolePermission(role = role0, permission = p3)
    rp4 = RolePermission(role = role0, permission = p4)
    rp5 = RolePermission(role = role0, permission = p5)
    rp6 = RolePermission(role = role0, permission = p6)
    rp7 = RolePermission(role = role0, permission = p7)
    rp8 = RolePermission(role = role0, permission = p8)
    rp9 = RolePermission(role = role0, permission = p9)
    rp10= RolePermission(role = role0, permission = p10)
    rp11 = RolePermission(role = role0, permission = p11)

    print('Adding roles_permissions to manager...')
    rp12 = RolePermission(role = role1, permission = p1)
    rp13 = RolePermission(role = role1, permission = p4)
    rp14 = RolePermission(role = role1, permission = p5)
    rp15 = RolePermission(role = role1, permission = p6)
    rp16 = RolePermission(role = role1, permission = p8)
    rp17 = RolePermission(role = role1, permission = p9)
    rp18 = RolePermission(role = role1, permission = p10)

    print('Adding roles_permissions to sales...')
    rp19 = RolePermission(role = role2, permission = p1)
    rp20 = RolePermission(role = role2, permission = p5)
    rp21 = RolePermission(role = role2, permission = p6)
    rp22 = RolePermission(role = role2, permission = p8)
    rp23 = RolePermission(role = role2, permission = p9)
    rp24 = RolePermission(role = role2, permission = p10)

    print('Adding roles_permissions to guest...')
    rp25 = RolePermission(role = role3, permission = p1)
    rp26 = RolePermission(role = role3, permission = p4)
    rp27 = RolePermission(role = role3, permission = p5)
    rp28 = RolePermission(role = role3, permission = p6)
    rp29 = RolePermission(role = role3, permission = p8)
    rp30 = RolePermission(role = role3, permission = p9)
    rp31= RolePermission(role = role3, permission = p10)
    rp32 = RolePermission(role = role3, permission = p11)

    db.session.add_all([rp0,rp1,rp2,rp3,rp4,rp5,rp6,rp7,rp8,rp9,rp10,rp11,rp12,rp13,rp14,rp15,rp16,rp17,rp18,rp19,rp20,rp21,rp22,rp23,rp24,rp25,rp26,rp27,rp28,rp29,rp30,rp31,rp32])
    db.session.commit()

    print('seeding customers...')
    customers = create_customers()
    db.session.add_all(customers)
    db.session.commit()

    print('seeding quotes...')
    quotes = create_quotes()
    db.session.add_all(quotes)
    db.session.commit()

    print('seeding configurations...')
    configurations = create_configurations()
    db.session.add_all(configurations)
    db.session.commit()

    print('updating quote calculated fields...')
    calculate_quote_info()

    print('done seeding')