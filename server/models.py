from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from config import db, bcrypt, metadata
from sqlalchemy.ext.associationproxy import association_proxy


class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key = True)
    account_number = db.Column(db.Integer, nullable=False)
    company_name = db.Column(db.String, nullable=False, unique=True)
    address_1 = db.Column(db.String)
    address_2 = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zip_code = db.Column(db.Integer)
    phone = db.Column(db.String)
    discount = db.Column(db.Float)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_by = db.Column(db.Integer)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    updated_by = db.Column(db.Integer)
    
    @validates('account_number')
    def validate_account_number(self, key, value):
        if value == None:
            raise ValueError ({'error' : '422: Account number must contain a value'}, 422)
        elif Account.query.filter(Account.account_number == value).first():
            raise ValueError ({'error' : '422: Account number must be unique'}, 422)
        return value

    @validates('company_name')
    def validate_company_name(self, key, value):
        if value == "":
            raise ValueError ({'error' : '422: A company name must be entered'}, 422)
        elif Account.query.filter(Account.company_name == value).first():
            raise ValueError ({'error' : '422: Company name must be unique'}, 422)
        return value
    
    # relationships
    users = db.relationship('User', back_populates = 'account', cascade='all, delete')
    customers = db.relationship('Customer', back_populates = 'account', cascade='all, delete')
    quotes = db.relationship('Quote', back_populates = 'account', cascade='all, delete')
    orders = db.relationship('Order', back_populates = 'account', cascade='all, delete')

    # serialize_rules = ('-users.status', '-users._password_hash','-users.account.customers', '-quotes.account', '-quotes.customers', '-orders.account')

    serialize_rules = ('-users.status', '-users._password_hash', '-quotes.account', '-customers.orders', '-customers.quotes.customer', '-customers.quotes.order', '-customers.quotes.screenconfigurations', '-quotes.screenconfigurations', '-orders.quote', '-orders.screenconfigurations', '-orders.customer', '-orders.account_id', '-orders.quote_id', '-orders.termsAndConditions', '-orders.user_id')

    def __repr__(self):
        return f'Account {self.id}, {self.account_number}, {self.company_name}, {self.address_1}, {self.address_2}, {self.city}, {self.state}, {self.zip_code}, {self.phone}, {self.discount}, {self.markup_variable}, {self.created_at}, {self.updated_at}'


class User(db.Model,SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, nullable=False, unique = True)
    username = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    created_by = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    updated_by = db.Column(db.Integer)
    status = db.Column(db.String)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable = False)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
            )

    @validates('first_name', 'last_name')
    def validates_name(self, key, name):
        if name == "":
            return {'errors' : '402: First and / or last name fields must be populated.'}
        return name

    # @validates('username')
    # def validate_username(self, key, username):
    #     try:
    #         if username == "":
    #             return {'errors' : '422: A username must contain 3 or more characters'}, 422
    #         elif len(username) < 3:
    #             return {'errors' : '422: A username must contain 3 or more characters'}, 422
    #         elif User.query.filter(User.username == username).first():
    #             return {'errors' : '422: The username value entered is not unique.'}, 422
    #         return username
    #     except ValidationError as e:
    #         raise ValidationError(f'Email validation error: {str(e)}')
    #     except Exception as e:
    #         raise ValidationError(f'An unexpected error occurred: {str(e)}')
    
    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("Invalid email address entered")
        elif User.query.filter(User.email == address).first():
            raise ValueError ({'error' : '422: Email must be unique'}, 422)
        elif address == None:
            raise ValueError({'error' : '422 : The email field must contain a value'}, 422)
        return address
    
    @validates('account_id')
    def validate_account_id(self, key, account_id):
        try: 
            if account_id == "":
                return {'errors' : '422: An account id must be entered'}, 422
            return account_id
        except ValidationError as e:
            raise ValidationError(f'Account Id validation error: {str(e)}')
        except Exception as e:
            raise ValidationError(f'An unexpected error occurred: {str(e)}')

    # relationships
    account = db.relationship('Account', back_populates = 'users')
    role = db.relationship('Role', back_populates = 'users')
    orders = db.relationship('Order', back_populates = 'user')

    serialize_rules = ('-account.users', '-account.created_at', '-account.updated_at', '-account.address_1', '-account.address_2', '-account.city', '-account.id', '-account.phone', '-account.zip_code', '-role', '-orders.user',)

    def __repr__(self):
        return f'User {self.id}, {self.first_name}, {self.last_name}, {self.username}, {self.created_at}, {self.updated_at}, {self.status}, {self.account_id}'


class RolePermission(db.Model, SerializerMixin):
    __tablename__ = 'roles_permissions'

    id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    permission_id = db.Column(db.Integer, db.ForeignKey('permissions.id'))
    granted_at = db.Column(db.DateTime, server_default=db.func.now())
    expires_at = db.Column(db.DateTime)
    status = db.Column(db.String)

    #relationships
    role = db.relationship('Role', back_populates='roles_permissions')
    permission = db.relationship('Permission', back_populates='roles_permissions')

    def __repr__(self):
        return f'RolePermission {self.id}, {self.role.title}, {self.permission.name}, {self.permission.description}, {self.granted_at}, {self.expires_at}'


class Role(db.Model, SerializerMixin):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)

    # relationships
    roles_permissions = db.relationship('RolePermission', back_populates='role', cascade='all, delete-orphan')
    # permissions = db.relationship('Permission', secondary=role_permissions, back_populates='roles')
    # permissions = db.relationship('Permission', back_populates='roles')
    users = db.relationship('User', back_populates='role')

    # association proxy
    permissions = association_proxy('roles_permissions', 'permission', creator=lambda permission_obj: RolePermission(permission=permission_obj))

    def __repr__(self):
        return f'Role {self.id}, {self.title}'


class Permission(db.Model, SerializerMixin):
    __tablename__ = 'permissions'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    #relationship
    roles_permissions = db.relationship('RolePermission', back_populates='permission', cascade='all, delete-orphan')
    # roles = db.relationship('Role', secondary=role_permissions, back_populates='permissions')
    # roles = db.relationship('Role', back_populates='permissions')

    # association proxy
    roles = association_proxy('roles_permissions', 'role', creator=lambda role_obj: RolePermission(role=role_obj))


    def __repr__(self):
        return f'Role {self.id}, {self.name}, {self.description}'


class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String, nullable = False)
    last_name = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False, unique = True)
    phone = db.Column(db.String, nullable = False, unique = True)
    address_1 = db.Column(db.String)
    address_2 = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zip_code = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_by = db.Column(db.Integer)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    updated_by = db.Column(db.Integer)
    notes = db.Column(db.String)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable = False)
    status = db.Column(db.String)

    @validates('phone')
    def validate_phone(self, key, value):
        if value == None:
            raise ValueError ({'error' : '422: Phone number must contain a value'}, 422)
        elif Customer.query.filter(Customer.phone == value).first():
            raise ValueError ({'error' : '422: Phone number must be unique'}, 422)
        return value

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("Invalid email address entered")
        elif Customer.query.filter(Customer.email == address).first():
            raise ValueError ({'error' : '422: Email must be unique'}, 422)
        elif address == None:
            raise ValueError({'error' : '422 : The email field must contain a value'}, 422)
        return address

    @validates('first_name', 'last_name')
    def validates_name(self, key, name):
        if name == "":
            return {'errors' : '402: First and / or last name fields must be populated.'}
        return name

    # @validates('notes')
    # def validate_notes(self, key, notes):
    #     if len(notes) > 500:
    #         raise ValueError("You have exceeded the 500 character limit")
    #     return notes
    
    @validates('account_id')
    def validate_account_id(self, key, account_id):
        try: 
            if account_id == "":
                return {'errors' : '422: An account id must be entered'}, 422
            return account_id
        except ValidationError as e:
            raise ValidationError(f'Account Id validation error: {str(e)}')
        except Exception as e:
            raise ValidationError(f'An unexpected error occurred: {str(e)}')

    ## relationships
    quotes = db.relationship('Quote', back_populates = 'customer', cascade='all, delete')
    account = db.relationship('Account', back_populates = 'customers')
    orders = db.relationship('Order', back_populates = 'customer')

    ##serialize
    serialize_rules = ('-account','-quotes.account_id', '-quotes.customer_id', '-orders.customer',)

    def __repr__(self):
        return f'Customer {self.id}, {self.first_name}, {self.last_name}, {self.email}, {self.phone}, {self.created_at}, {self.created_by}, {self.updated_at}, {self.updated_by}, {self.notes}, {self.account_id} '


# class Configuration(db.Model, SerializerMixin):
#     __tablename__ = 'configurations'
#     id = db.Column(db.Integer, primary_key = True)
#     sku = db.Column(db.String)
#     product_title = db.Column(db.String)
#     product_description = db.Column(db.String)
#     cost = db.Column(db.Integer)
#     quote_id = db.Column(db.Integer, db.ForeignKey('quotes.id'))
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     created_by = db.Column(db.Integer)
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())
#     updated_by = db.Column(db.Integer)

#     ##relationships
#     quote = db.relationship('Quote', back_populates = 'configurations')

#     ##serialize
#     serialize_rules = ('-quote.configurations',)

#     def __repr__(self):
#         return f'Configuration {self.id}, {self.sku}, {self.product_title}, {self.product_description}, {self.cost}'
    

class Quote(db.Model, SerializerMixin):
    __tablename__ = 'quotes'
    id = db.Column(db.Integer, primary_key = True)
    quote_number = db.Column(db.Integer, unique = True)
    title = db.Column(db.String)
    total_cost =db.Column(db.Float)
    discount = db.Column(db.Float)
    savings = db.Column(db.Integer)
    markup_variable = db.Column(db.Float)
    sale_price = db.Column(db.Integer)
    margin_percentage = db.Column(db.Integer)
    margin_dollars = db.Column(db.Integer)
    notes = db.Column(db.String(500))
    status = db.Column(db.String)
    converted = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_by = db.Column(db.Integer)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    updated_by = db.Column(db.Integer)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))

    @validates('quote_number')
    def validate_quote_number(self, key, value):
        if Quote.query.filter(Quote.quote_number == value).first():
            raise ValueError ({'error' : '422: Quote Number must be unique'}, 422)
        return value

    # relationships
    customer = db.relationship('Customer', back_populates = 'quotes')
    screenconfigurations = db.relationship('ScreenConfiguration', back_populates = 'quote', cascade='all, delete')
    account = db.relationship('Account', back_populates = 'quotes')
    order = db.relationship('Order', back_populates = 'quote')

    ##serialize
    # serialize_rules = ('-customer.quotes','-customer.account_id', '-customer.created_at', '-customer.created_by', '-customer.id', '-customer.updated_at', '-customer.updated_by', '-screenconfigurations.quote_id','-account.quotes','-order.quote')

    serialize_rules = ('-order', '-hashedquotepreview', '-customer.account', '-customer.quotes', '-customer.orders', '-screenconfigurations.quote_id', 'account.company_name', '-account.users.account', '-account.customers', '-account.quotes', '-account.orders', '-order.account_id', '-order.created_by', '-order.created_at', '-order.customer_id', '-order.id', '-order.notes', '-order.orderDate', '-order.quote_id', '-order.status', '-order.termsAndConditions', '-order.user_id', '-order.screenconfigurations', '-screenconfigurations.quote', '-screenconfigurations.created_by', '-screenconfigurations.updated_at','-screenconfigurations.updated_by')

    def __repr__(self):
        return f'Quote {self.id}, {self.quote_number}, {self.title}, {self.discount}, {self.savings}, {self.markup_variable}, {self.sale_price}, {self.margin_percentage}, {self.margin_dollars}, {self.notes}, {self.status}, {self.converted}, {self.created_at}, {self.created_by}, {self.updated_at}, {self.updated_by}'


class ScreenConfiguration(db.Model, SerializerMixin):
    __tablename__='screenconfigurations'
    id = db.Column(db.Integer, primary_key = True)
    project_name = db.Column(db.String)
    unit_name = db.Column(db.String)
    complete_unit = db.Column(db.Boolean)
    housing = db.Column(db.Boolean)
    side_track = db.Column(db.Boolean)
    hem_bar = db.Column(db.Boolean)
    fabric = db.Column(db.Boolean)
    motor_tube = db.Column(db.Boolean)
    unit_width = db.Column(db.Float)
    unit_height = db.Column(db.Float)
    housing_tube_size = db.Column(db.String)
    housing_type = db.Column(db.String)
    motor_type = db.Column(db.String)
    motor_side = db.Column(db.String)
    power_chord = db.Column(db.String)
    motor_charge = db.Column(db.Float)
    tube_charge = db.Column(db.Float)
    housing_charge = db.Column(db.Float)
    retention_type = db.Column(db.String)
    retention_cap_color = db.Column(db.String)
    # left_retention = db.Column(db.String)
    # right_retention = db.Column(db.String)
    tracks_exact_length = db.Column(db.Boolean)
    tracks_charge = db.Column(db.Float)
    hem_bar_type = db.Column(db.String)
    hem_cap_color = db.Column(db.String)
    pile_brush_style = db.Column(db.String)
    hem_bar_charge = db.Column(db.Float)
    fabric_type = db.Column(db.String)
    fabric_selection = db.Column(db.String)
    # seam_location = db.Column(db.String)
    # seam_location_num = db.Column(db.Integer)
    zipper_color = db.Column(db.String)
    # usable_fabric_width = db.Column(db.Integer)
    # rotate_fabric = db.Column(db.String)
    fabric_charge = db.Column(db.Float)
    color_collection = db.Column(db.String)
    frame_color = db.Column(db.String)
    powder_charge = db.Column(db.Float)
    list_price = db.Column(db.Float)
    quote_id = db.Column(db.Integer, db.ForeignKey('quotes.id'))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_by = db.Column(db.Integer)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    updated_by = db.Column(db.Integer)

    ##relationships
    quote = db.relationship('Quote', back_populates = 'screenconfigurations')
    order = db.relationship('Order', back_populates = 'screenconfigurations')

    ##serialize
    serialize_rules = ('-quote.screenconfigurations','-order.screenconfigurations')

    def __repr__(self):
        return f'Configuration {self.id}, {self.project_name}, {self.unit_name}, {self.complete_unit}, {self.housing}, {self.side_track}, {self.hem_bar}, {self.fabric}, {self.motor_tube}, {self.unit_width}, {self.unit_height}, {self.housing_tube_size}, {self.housing_type}, {self.motor_type}, {self. motor_side}, {self. power_chord}, {self.retention_type}, {self.retention_cap_color}, {self.tracks_exact_length}, {self.hem_bar_type}, {self.hem_cap_color}, {self.pile_brush_style}, {self.fabric_type}, {self.fabric_selection}, {self.zipper_color}, {self.color_collection}, {self.frame_color}, {self.list_price}, {self.quote_id}, {self.created_at}, {self.created_by}, {self.updated_at}, {self.updated_by}'


class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    status = db.Column(db.String)
    notes = db.Column(db.String)
    terms_conditions = db.Column(db.String)
    sale_price = db.Column(db.Float)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    quote_id = db.Column(db.Integer, db.ForeignKey('quotes.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_by = db.Column(db.Integer)

    #relationships
    account = db.relationship('Account', back_populates='orders')
    user = db.relationship('User', back_populates='orders')
    quote = db.relationship('Quote', back_populates='order')
    customer = db.relationship('Customer', back_populates='orders')
    screenconfigurations = db.relationship('ScreenConfiguration', back_populates='order')
    # add_on_accessories = db.relationship('AddOnAccessory', back_populates='order')
    # misc_items = db.relationship('Miscellaneous', back_populates='order')

    # serialize rules
    serialize_rules = ('-account.orders','-account.customers', '-account.quotes', '-account.users', '-account.account_number', '-account.address_1', '-account.address_2', '-account.city', '-account.created_at', '-account.created_by', '-account.discount', '-account.id', '-account.state', '-account.status', '-account.updated_at', '-account.updated_by', '-account.zip_code', '-quote.order', '-customer.account', '-customer.orders', '-customer.quotes', '-add_on_accessories.order', '-quote.account','-quote.add_on_accessories',  '-quote.customer', '-quote.screenconfigurations', '-quote.status', '-screenconfigurations.quote', '-screenconfigurations.cut_to_length', '-screenconfigurations.fabric_charge', '-screenconfigurations.frame_buildout_collection', '-screenconfigurations.frame_buildout_color', '-screenconfigurations.frame_charge', '-screenconfigurations.frame_collection', '-screenconfigurations.frame_color_varies', '-screenconfigurations.frame_hem_bar_collection', '-screenconfigurations.frame_hem_bar_color', '-screenconfigurations.frame_housing_collection', '-screenconfigurations.frame_housing_color', '-screenconfigurations.frame_retention_collection', '-screenconfigurations.frame_retention_color', '-screenconfigurations.hem_bar_cap', '-screenconfigurations.hem_bar_charge', '-screenconfigurations.hem_bar_type', '-screenconfigurations.housing_charge', '-screenconfigurations.housing_option', '-screenconfigurations.housing_type', '-screenconfigurations.included_buildout', '-screenconfigurations.included_complete_unit', '-screenconfigurations.included_fabric', '-screenconfigurations.included_hem_bar', '-screenconfigurations.included_housing', '-screenconfigurations.included_motor_tube', '-screenconfigurations.included_retention', '-screenconfigurations.motor_brand', '-screenconfigurations.motor_charge', '-screenconfigurations.motor_cord', '-screenconfigurations.motor_side', '-screenconfigurations.motor_type', '-screenconfigurations.order_id', '-screenconfigurations.pile_brush', '-screenconfigurations.retention_cap', '-screenconfigurations.retention_charge', '-screenconfigurations.retention_left', '-screenconfigurations.retention_right', '-screenconfigurations.retention_type', '-screenconfigurations.tube_charge', '-screenconfigurations.unit_height_ft', '-screenconfigurations.unit_width_ft', '-screenconfigurations.zipper_color',)

    def __repr__(self):
        return f'Order {self.id}, {self.orderNumber}, {self.orderDate}, {self.status}, {self.notes}, {self.termsAndConditions}, {self.account_id}, {self.customer_id}, {self.quote_id}, {self.customer_id}, {self.user_id}, {self.created_by}'
    

# create new resource called Demo, with table name 'demos' and include three attributes: id, name, and description
class Demo(db.Model, SerializerMixin):
    __tablename__ = 'demos'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    def __repr__(self):
        return f'Demo {self.id}, {self.name}, {self.description}'   


    