from config import app, db, func
from random import randint, choice as rc, choices
from datetime import datetime
from faker import Faker
from models import * 
from sqlalchemy import text


fake = Faker()
status_list = ['active', 'inactive']
roles = [1, 2, 3, 4]
tube_size = ['Standard(4.5")', 'Jumbo(5.75")', 'Micro(3.5")']
housing_type_options = ['Complete', 'Housing Base(no cover)', 'Open Mount Brackets']
motor_type_options = ['Alpha pro+OD', 'Somfy RTS', 'Somfy Hardwired', 'Somfy AutoSun']
motor_side = ['Left', 'Right']
powerChord_options = ['6ft with pigtail(Alpha)', '32ft with pigtail(Alpha)', '30ft BLACK with molded plug (Alpha)']
retention_options = ['Surface Mount', 'Recessed', 'Cable Guide', 'Track Guide', 'None']
cap_color = ['Jet Black','Signal White','Urban Gray', 'Anthracite']
hem_bar_options = ['Tall', 'Standard', 'Lanai']
pile_brush_options = ['1/2 in Black', '1/2 in White', '1/2 in Gray', '3/4 in Black', '2 in Black', '2 in Black (Double)', 'None']
fabric_type_options = ['Ferrari Soltis Opaque B92', 'Ferrari Soltis Proof 502', 'Ferrari Soltis Horizon 86', 'Ferrari Soltis Perform 92', 'Twitchell Dimout', 'Mermet Natte 10%', 'Mermet Natte 3%', 'Mermet Natte 5%', 'Mermet Satine 1%', 'Mermet Satine 5%', 'Ferrari Soltis Veozip', 'Twitchell Nano 50', 'Twitchell Nano 55', 'Twitchell Nano 60', 'Twitchell Nano 70', 'Twitchell Nano 95', 'Twitchell Nano 97', 'Twitchell Nano 99', 'Twitchell OmegaTex', 'Twitchell Textilene 80', 'Twitchell Textilene 90', 'Twitchell Textilene 95']
ferrari_opaque_b92 = ['Alu', 'Beaten Metal', 'Boulder', 'Bronze', 'Deep Black', 'Sandy Beige', 'White', 'B702 Black/ White']
ferrari_horizon_86 = ['Alu/White', 'Beaten Metal', 'Champagne', 'Alu/Oat', 'Concrete', 'Sandy Beige', 'Alu/Alu', 'Anthacite', 'Boulder', 'Alu/Anthracite', 'Pepper', 'Bronze', 'Buttercup', 'Red', 'Orange', 'Moss Green', 'Aniseed', 'Snow White', 'Brick', 'Deep Red', 'Deep Blue', 'Deep Black']
ferrari_perform_92 = ['White', 'Boulder', 'Alu/Anthracite', 'Sandy Beige', 'Alu/White', 'Beaten Metal', 'Cloud', 'Alu/Oat', 'Concrete', 'Tenis Green', 'Alu/Alu', 'Alu/Medium Grey', 'Anthracite', 'Quartz', 'Champagne', 'Hemp', 'Pepper', 'Gold', 'Havana-Brown', 'Bronze', 'Beetle', 'Snow White', 'Shea', 'Moss Green', 'Taupe', 'Dark Grey', 'Aniseed', 'Celestial Grey', 'Green-Grey', 'Buttercup', 'Orange', 'Copper', 'Brick', 'Deep Red', 'Deep Blue', 'Deep Black', 'Red', 'Lagoon']
ferrari_proof_502 = ['White', 'Boulder', 'Concrete', 'Black', 'Champagne', 'Vanilla', 'Hemp', 'Sandy Beige', 'Pepper', 'Camel', 'Cocoa', 'Teak', 'Walnut Stain', 'Lemon', 'Buttercup', 'Dijon', 'Orange', 'Carrot', 'Raspberry', 'Poppy', 'Terracotta', 'Burgundy', 'Aniseed', 'Olive', 'Moss Green', 'Porcelain Green', 'Tennis Green', 'Spruce', 'Celadon', 'Steel Blue', 'Lagoon', 'Dark Blue', 'Thistle Blue', 'Celestial Blue', 'Victoria Blue', 'Midnight Blue', 'Marine', 'Velvet Red', 'Autumn', 'Aluminium']
ferrari_veozip = ['Graphite Black', 'Grey Pepper', 'Sandalwood', 'Volcano', 'Shadow', 'Sea Urchin', 'Sea Lion', 'Lunar Surface', 'Tundra', 'Mistral', 'Macadamia', 'Natural', 'Cumulus', 'Edelweiss', 'Frost White']
mermette_natte = ['Sable-Wood', 'Sable-White', 'Sable-Sable-Fog', 'Grey-Sable', 'Grey-Grey', 'Grey-Charcoal', 'Charcoal-Garnet', 'Charcoal-Forest', 'Charcoal-Cocoa-Fawn', 'Charcoal-Charcoal-Navy', 'Charcoal-Charcoal', 'Charcoal-Cocoa']
mermette_satine = ['Satine Sable-Wood', 'Satine Sable-Garnet-Auburn', 'Satine Sable-Forest', 'Satine Grey-Navy', 'Satine Grey-Fog-Charcoal', 'Satine Charcoal-Garnet', 'Satine Charcoal-Cocoa-Fawn', 'Satine Charcoal-Cocoa', 'Satine Charcoal-Charcoal-Navy', 'Satine Charcoal-Charcoal-Grey', 'Satine Charcoal-Charcoal-Auburn', 'Satine Charcoal-Charcoal']
twitchell_dimout = ['Flat Black', 'Charcoal', 'Grey', 'Light Grey', 'Putty', 'Tan', 'Tobacco', 'White']
twitchell50_70 = ['Black', 'White']
twitchell95_97 = ['White', 'Bone', 'Sable', 'Stone Texture', 'Shadow Texture', 'Espresso Texture', 'Granite', 'Tobacco', 'Charcoal', 'Flat Black', 'Desert Sand', 'Almond', 'Cafe', 'Tumbleweed']
twitchell_99 = ['Espresso Texture', 'Granite', 'Tobacco', 'Charcoal', 'Flat Black']
twitchell_omega = ['Black Tan', 'Black', 'White and Tan', 'White']
twitchell80_90 = ['Black', 'Black/Brown', 'Desert Sand', 'White', 'Brown', 'Dusk Grey', 'Sandstone']
twitchell_95 =['Pure White', 'Pewter', 'Mushroom', 'Quartz', 'Putty', 'Almond Brown', 'Tumbleweed Texture', 'Tobacco Leaf', 'Graphite', 'Carbon Texture', 'Galaxy Black']
seam_location_options = ['As high as possible', 'As low as possible']
zipper_color_options = ['Black', 'White']
width_126 = ['Ferrari Soltis Veozip', 'Twitchell Nano 50', 'Twitchell Nano 55', 'Twitchell Nano 60', 'Twitchell Nano 70', 'Twitchell Nano 95', 'Twitchell Nano 97', 'Twitchell Nano 99', 'Twitchell OmegaTex', 'Twitchell Textilene 80', 'Twitchell Textilene 90', 'Twitchell Textilene 95']
width_122 = ['Mermet Natte 10%', 'Mermet Natte 3%', 'Mermet Natte 5%', 'Mermet Satine 1%', 'Mermet Satine 5%']
width_105 = ['Ferrari Soltis Horizon 86', 'Ferrari Soltis Perform 92']


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
        quote_number=fake.unique.random_number(digits=3),
        title=fake.name(),
        customer_id=selected_customer_id,
        account_id=account_data['account_id'],
        discount=account_data['discount'],
        markup_variable= rc(range(150, 200)) / 100,
        notes=fake.sentence(),
        status = choices(status_list, weights = [10, 1], k=1)[0],
        converted='No',
        created_at=datetime.now(),
        created_by = 1,
    )

    quotes.append(q)
  
  return quotes

def create_screenConfigurations():
  screenConfigurations = []
  fabric_selections = {
    'Ferrari Soltis Opaque B92' : ferrari_opaque_b92,
    'Ferrari Soltis Proof 502' : ferrari_proof_502,
    'Ferrari Soltis Horizon 86' : ferrari_horizon_86,
    'Ferrari Soltis Perform 92' : ferrari_perform_92,
    'Twitchell Dimout' : twitchell_dimout,
    'Mermet Natte 10%' : mermette_natte,
    'Mermet Natte 3%' : mermette_natte,
    'Mermet Natte 5%' : mermette_natte,
    'Mermet Satine 1%' : mermette_satine,
    'Mermet Satine 5%' : mermette_satine,
    'Ferrari Soltis Veozip' : ferrari_veozip,
    'Twitchell Nano 50' : twitchell50_70,
    'Twitchell Nano 55' : twitchell50_70,
    'Twitchell Nano 60' : twitchell50_70,
    'Twitchell Nano 70' : twitchell50_70,
    'Twitchell Nano 95' : twitchell95_97,
    'Twitchell Nano 97' : twitchell95_97,
    'Twitchell Nano 99' : twitchell_99,
    'Twitchell OmegaTex' : twitchell_omega,
    'Twitchell Textilene 80' : twitchell80_90,
    'Twitchell Textilene 90' : twitchell80_90,
    'Twitchell Textilene 95' : twitchell_95
      }

  def get_fabric_selection(fabric_type):
    if fabric_type in fabric_selections:
      return rc(fabric_selections[fabric_type])
  
  def calc_seam_num(seam_location):
    if seam_location == 'As high as possible':
      seam_location_num = unit_width * .6345975
    return seam_location_num
    if seam_location == 'As low as possible':
      seam_location_num = unit_width * .4258475
    return seam_location_num

  def get_usable_fab_width():
    if fabric_type in width_126:
      return 124
    if fabric_type in width_122:
      return 120
    if fabric_type == 'Twitchell Dimout':
      return 118
    if fabric_type in width_105:
      return 103
    if fabric_type == 'Ferrari Soltis Proof 502':
      return 68.8
    if fabric_type == 'Ferrari Soltis Opaque B92':
      return 64.9

  for _ in range(35):
    fabric_type = choices(fabric_type_options, weights=[1] * len(fabric_type_options), k=1)[0]
    unit_width = rc(range(36, 300))
    unit_height = rc(range(36, 400))
    seam_location = choices(seam_location_options, weights=[1] * len(seam_location_options), k=1)[0]
    seam_location_num = unit_width * .6345975
    motor_type =  choices(motor_type_options, weights=[10,10,5,1], k=1)[0]
    power_chord = choices(powerChord_options, weights=[10,5,5], k=1)[0]
    housing_tube_size = choices(tube_size, weights=[10,5,1], k=1)[0]
    housing_type = choices(housing_type_options, weights=[10,5,1], k=1)[0]
    retention_type = choices(retention_options, weights=[10, 5, 5, 5, 1], k=1)[0]
    hem_bar_type = choices(hem_bar_options, weights=[10, 5, 1], k=1)[0]
    fabric_sqft = ((unit_width * unit_height) / 144)

    s = ScreenConfiguration (
      project_name = fake.word(),
      unit_name = fake.name(),
      complete_unit = True,
      housing = True,
      side_track = True,
      hem_bar = True,
      fabric = True,
      motor_tube = True,
      unit_width = unit_width,
      unit_height = unit_height,
      housing_tube_size = housing_tube_size,
      housing_type = housing_type,
      motor_type = motor_type,
      motor_side = choices(motor_side, weights=[50,50], k=1)[0],
      power_chord = power_chord,
      # motor_charge = 1000,
      # tube_charge = 1000,
      # housing_charge = 1000,
      retention_type = retention_type,
      retention_cap_color = choices(cap_color, weights=[1] * len(cap_color), k=1)[0],
      tracks_exact_length = False,
      # tracks_charge = 2000,
      hem_bar_type = hem_bar_type,
      hem_cap_color = choices(cap_color, weights=[1] * len(cap_color), k=1)[0],
      pile_brush_style = choices(pile_brush_options, weights=[5,5,5,5,5,5,5], k=1)[0],
      # hem_bar_charge = 2000,
      fabric_type = fabric_type,
      fabric_selection = get_fabric_selection(fabric_type),
      # seam_location = seam_location,
      # seam_location_num = seam_location_num,
      zipper_color = choices(zipper_color_options, weights = [10, 1], k=1)[0],
      # usable_fabric_width = get_usable_fab_width(),
      # rotate_fabric = 'No',
      # fabric_charge = 3000,
      color_collection = 'Templar Selection',
      frame_color = 'Black',
      # powder_charge = 4000,
      # charges = [motor_charge, tube_charge, housing_charge, tracks_charge, hem_bar_charge, fabric_charge, powder_charge]
      # list_price = sum(charges)
      quote_id = rc([quote.id for quote in quotes]),
      created_by = 1,
      )
    s.motor_type_price = 0
    s.power_chord_price = 0
    def get_motor_charge(motor_type):
      if motor_type == 'Alpha pro+OD':
        s.motor_type_price = 0
      if motor_type == 'Somfy RTS' or motor_type == 'Somfy Hardwired':
        s.motor_type_price = 300
      if motor_type == 'Somfy Autosun':
        s.motor_type_price = 600
      return s.motor_type_price
    
    def get_power_chord_price(power_chord):
      if power_chord == '6ft with pigtail(Alpha)':
        s.power_chord_price = 0
      if power_chord == '32ft with pigtail(Alpha)':
        s.power_chord_price = 85
      if power_chord == '30ft BLACK with molded plug (Alpha)':
        s.power_chord_price = 95
      return s.power_chord_price

    def get_tube_price(housing_tube_size):
      if housing_tube_size == 'Standard(4.5")':
        s.housing_tube_price = 549.26
      if housing_tube_size == 'Jumbo(5.75")':
        s.housing_tube_price = 670
      if housing_tube_size == 'Micro(3.5")':
        s.housing_tube_price = 447.01
      return s.housing_tube_price

    def get_housing_price(housing_type, housing_tube_size):
      s.housing_type_price = 0
      if housing_type == 'Complete' and housing_tube_size == 'Standard(4.5")':
        s.housing_type_price = 174.04
      if housing_type == 'Housing Base(no cover)' and housing_tube_size == 'Standard(4.5")':
        s.housing_type_price = 174.04
      if housing_type == 'Complete' and housing_tube_size == 'Jumbo(5.75")' or housing_type == 'Housing Base(no cover)' and housing_tube_size == 'Jumbo(5.75")':
        s.housing_type_price = 212.46
      if housing_type == 'Complete' and housing_tube_size == 'Micro(3.5")' or housing_type == 'Housing Base(no cover)' and housing_tube_size == 'Micro(3.5")':
        s.housing_type_price = 156.37
      return s.housing_type_price
    
    def get_tracks_pricing(retention_type):
      s.retention_type_pricing = 0
      if retention_type == 'Surface Mount':
        s.retention_type_pricing = 60.19
      if retention_type == 'Recessed':
        s.retention_type_pricing = 75.17
      if retention_type == 'Cable Guide':
        s.retention_type_pricing = 200
      return s.retention_type_pricing

    def get_hemBar_pricing(hem_bar_type):
      if hem_bar_type == 'Tall':
        s.hem_bar_price = 72.88
      if hem_bar_type == 'Standard':
        s.hem_bar_price = 66.39
      if hem_bar_type == 'Lanai':
        s.hem_bar_price = 272.88
      return s.hem_bar_price
    
    def get_fabric_pricing(fabric_type):
      fabric_price = 0

      if fabric_type == 'Twitchell Nano 50':
        fabric_price = 151.26
      if fabric_type == 'Twitchell Nano 55':
        fabric_price = 151.77
      if fabric_type == 'Twitchell Nano 60':
        fabric_price = 161.84
      if fabric_type == 'Twitchell Nano 70':
        fabric_price = 193.61
      if fabric_type == 'Twitchell Nano 95':
        fabric_price = 261.67
      if fabric_type == 'Twitchell Nano 99':
        fabric_price = 151.26
      if fabric_type == 'Twitchell Dimout':
        fabric_price = 352.43
      if fabric_type == 'Twitchell Textilene 80' or fabric_type == 'Twitchell Textilene 95':
        fabric_price = 202.68
      if fabric_type == 'Twitchell Textilent 90':
        fabric_price = 232.93
      if fabric_type == 'Ferrari Soltis Perform':
        fabric_price = 484.02
      if fabric_type == 'Ferrari Soltis Opaque B92':
        fabric_price = 1246.34
      if fabric_type == 'Ferrari Soltis Proof':
        fabric_price = 653.42
      if fabric_type == 'Ferrari Soltis Veozip':
        fabric_price = 261.67
      if fabric_type == 'Ferrari Soltis Horizon':
        fabric_price = 591.41
      if fabric_type == 'Ferrari Harmony':
        fabric_price = 529.39
      if fabric_type == 'Mermett Natte 3%':
        fabric_price = 423.52
      if fabric_type == 'Mermett Natte 5%':
        fabric_price = 391.80
      if fabric_type == 'Mermett Natte 10%':
        fabric_price = 370.58
      if fabric_type == 'Mermet Satine 1%':
        fabric_price = 432.59
      if fabric_type == 'Mermet Satine 5%':
        fabric_price = 400.83
      if fabric_type == 'Twitchell OmegaTex':
        fabric_price = 642.84
      if fabric_type == 'Sunbrella 60 (Solid)':
        fabric_price = 529.39
      return fabric_price

    s.motor_charge = get_motor_charge(motor_type) + get_power_chord_price(power_chord)
    s.tube_charge = ((unit_width / 12) * 20.66) + get_tube_price(housing_tube_size)
    s.housing_charge = ((unit_width / 12) * 30.21) + get_housing_price(housing_type, housing_tube_size)
    s.tracks_charge = ((unit_height / 12) * 24.60) + get_tracks_pricing(retention_type)
    s.hem_bar_charge = ((unit_width / 12) * 10.038) + get_hemBar_pricing(hem_bar_type)
    s.fabric_charge = ((fabric_sqft * 2.30) + get_fabric_pricing(fabric_type))
    s.powder_charge = 0
    charges = [s.motor_charge, s.tube_charge, s.housing_charge, s.tracks_charge, s.hem_bar_charge, s.fabric_charge, s.powder_charge]
    s.list_price = sum(charges)
    
    screenConfigurations.append(s)

  return screenConfigurations

# def create_configurations():
#   configurations = []

#   for _ in range(35):
#     cost = randint(3500, 1000000) / 100.0
#     configs = Configuration(
#       sku = fake.ean(length=8),
#       product_title = fake.company_suffix(),
#       product_description = fake.sentence(),
#       cost = cost,      
#       quote_id = rc([quote.id for quote in quotes]),
#       created_by = 1,
#     )

#     configurations.append(configs)
  
#   return configurations

def calculate_quote_info(quote_id=None):
  
  quote = Quote.query.filter(Quote.id == quote_id).first()
  if quote_id and not quote.screenconfigurations:
    quote.total_cost = None
    quote.savings = None
    quote.sale_price = None
    quote.margin_percentage = None
    quote.margin_dollars = None

    db.session.add(quote)
    
  else:
    total_costs = db.session.query(
        ScreenConfiguration.quote_id,
        func.sum(ScreenConfiguration.list_price).label('total_cost')
    ).group_by(ScreenConfiguration.quote_id).all()

    for total_cost_data in total_costs:
        quote_id = total_cost_data.quote_id
        total_cost = total_cost_data.total_cost

        # Fetch the corresponding quote
        quote = db.session.get(Quote, quote_id)
        
        # Assign misc variables associated to calculations
        cost_w_savings = total_cost - (total_cost * quote.discount)

        # SOMETHING GOING ON IN THIS SECTION WHEN ATTEMPTING TO SEED

        # Calculate the financial metrics
        quote.total_cost = total_cost
        quote.savings = total_cost * quote.discount
        quote.sale_price = cost_w_savings * quote.markup_variable
        quote.margin_percentage = ((quote.sale_price - cost_w_savings) / cost_w_savings)
        quote.margin_dollars = quote.sale_price - cost_w_savings

        db.session.add(quote)
    
  db.session.commit()

def recalculate_quote_totals(quote_id):
  quote = Quote.query.filter(Quote.id == quote_id).first()
  if not quote.screenconfigurations and not quote.add_on_accessories:
    quote.total_cost = None
    quote.savings = None
    quote.sale_price = None
    quote.margin_percentage = None
    quote.margin_dollars = None

    db.session.add(quote)
  
  else:
    configurationTotals = [config.list_price for config in quote.screenconfigurations]
    # accessoryTotals = [accessory.prod_cost for accessory in quote.add_on_accessories]
    configSum = sum(configurationTotals)
    # accessorySum = sum(accessoryTotals)

    total_cost = configSum
    
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
    session = db.session()
    
    # # # # # # # # # # # # # # # # # # # # # #
    # Use Truncate below to seed postgresql db
    # # # # # # # # # # # # # # # # # # # # # #
    #
    # Truncate all tables and reset primary key sequences
    # print("Truncating all tables...")
    # session.execute(text('''
    # DO $$ DECLARE\n
    #     r RECORD;
    # BEGIN
    #     FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
    #         EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
    #     END LOOP;
    # END $$;
    # '''))
    #
    # # # # # # # # # # # # # # # # # # # # # #

    # # # # # # # # # # # # # # # # # # # # # #
    # Uncomment query.delete commands below for sqlite db
    # # # # # # # # # # # # # # # # # # # # # #
    #
    print("Clearing db...")
    User.query.delete()
    Account.query.delete()
    RolePermission.query.delete()
    Role.query.delete()
    Permission.query.delete()
    Customer.query.delete()
    ScreenConfiguration.query.delete()
    # Configuration.query.delete()
    Quote.query.delete()
    db.session.commit()
    #
    # # # # # # # # # # # # # # # # # # # # # #

    print("Seeding accounts...")
    accounts = create_accounts()
    db.session.add_all(accounts)
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

    rp0 = RolePermission(role = role0, permission = p0, status = 'active')
    rp1 = RolePermission(role = role0, permission = p1, status = 'active')
    rp2 = RolePermission(role = role0, permission = p2, status = 'active')
    rp3 = RolePermission(role = role0, permission = p3, status = 'active')
    rp4 = RolePermission(role = role0, permission = p4, status = 'active')
    rp5 = RolePermission(role = role0, permission = p5, status = 'active')
    rp6 = RolePermission(role = role0, permission = p6, status = 'active')
    rp7 = RolePermission(role = role0, permission = p7, status = 'active')
    rp8 = RolePermission(role = role0, permission = p8, status = 'active')
    rp9 = RolePermission(role = role0, permission = p9, status = 'active')
    rp10= RolePermission(role = role0, permission = p10, status = 'active')
    rp11 = RolePermission(role = role0, permission = p11, status = 'active')

    print('Adding roles_permissions to manager...')
    rp12 = RolePermission(role = role1, permission = p1, status = 'active')
    rp13 = RolePermission(role = role1, permission = p4, status = 'active')
    rp14 = RolePermission(role = role1, permission = p5, status = 'active')
    rp15 = RolePermission(role = role1, permission = p6, status = 'active')
    rp16 = RolePermission(role = role1, permission = p8, status = 'active')
    rp17 = RolePermission(role = role1, permission = p9, status = 'active')
    rp18 = RolePermission(role = role1, permission = p10, status = 'active')

    print('Adding roles_permissions to sales...')
    rp19 = RolePermission(role = role2, permission = p1, status = 'active')
    rp20 = RolePermission(role = role2, permission = p5, status = 'active')
    rp21 = RolePermission(role = role2, permission = p6, status = 'active')
    rp22 = RolePermission(role = role2, permission = p8, status = 'active')
    rp23 = RolePermission(role = role2, permission = p9, status = 'active')
    rp24 = RolePermission(role = role2, permission = p10, status = 'active') 

    print('Adding roles_permissions to guest...')
    rp25 = RolePermission(role = role3, permission = p1, status = 'active')
    rp26 = RolePermission(role = role3, permission = p4, status = 'active')
    rp27 = RolePermission(role = role3, permission = p5, status = 'active')
    rp28 = RolePermission(role = role3, permission = p6, status = 'active')
    rp29 = RolePermission(role = role3, permission = p8, status = 'active')
    rp30 = RolePermission(role = role3, permission = p9, status = 'active')
    rp31= RolePermission(role = role3, permission = p10, status = 'active')
    rp32 = RolePermission(role = role3, permission = p11, status = 'active')

    db.session.add_all([rp0,rp1,rp2,rp3,rp4,rp5,rp6,rp7,rp8,rp9,rp10,rp11,rp12,rp13,rp14,rp15,rp16,rp17,rp18,rp19,rp20,rp21,rp22,rp23,rp24,rp25,rp26,rp27,rp28,rp29,rp30,rp31,rp32])
    db.session.commit()

    print('Seeding users...')
    users = create_users()
    db.session.add_all(users)
    db.session.commit()

    print('seeding customers...')
    customers = create_customers()
    db.session.add_all(customers)
    db.session.commit()

    print('seeding quotes...')
    quotes = create_quotes()
    db.session.add_all(quotes)
    db.session.commit()

    print('seeding screen configurations...')
    screenconfigurations = create_screenConfigurations()
    db.session.add_all(screenconfigurations)
    db.session.commit()

    print('updating quote calculated fields...')
    calculate_quote_info()

    print('done seeding')