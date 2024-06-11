from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from config import db, bcrypt, metadata


class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key = True)
    account_number = db.Column(db.Integer, nullable=False, unique=True)
    company_name = db.Column(db.String, nullable=False, unique=True)
    address_1 = db.Column(db.String)
    address_2 = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zip_code = db.Column(db.Integer)
    phone = db.Column(db.Integer)
    discount = db.Column(db.Integer)
    markup_variable = db.Column(db.Integer)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
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
    users = db.relationship('User', back_populates = 'account')
    customers = db.relationship('Customer', back_populates = 'account')
    quotes = db.relationship('Quote', back_populates = 'account')

    serialize_rules = ('-users.account', '-users.created_at', '-users.updated_at', '-users._password_hash', '-customers', '-quotes')

    def __repr__(self):
        return f'Account {self.id}, {self.account_number}, {self.company_name}, {self.address_1}, {self.address_2}, {self.city}, {self.state}, {self.zip_code}, {self.phone}, {self.discount}, {self.markup_variable}, {self.created_at}, {self.updated_at}'


class User(db.Model,SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String)
    username = db.Column(db.String(3), nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    status = db.Column(db.String, nullable=False)
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    _password_hash = db.Column(db.String(12))

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

    @validates('username')
    def validate_username(self, key, username):
        try:
            if username == "":
                return {'errors' : '422: A username must contain 3 or more characters'}, 422
            elif len(username) < 3:
                return {'errors' : '422: A username must contain 3 or more characters'}, 422
            elif User.query.filter(User.username == username).first():
                return {'errors' : '422: The username value entered is not unique.'}, 422
            return username
        except ValidationError as e:
            raise ValidationError(f'Email validation error: {str(e)}')
        except Exception as e:
            raise ValidationError(f'An unexpected error occurred: {str(e)}')



    # relationships
    account = db.relationship('Account', back_populates = 'users')
    role = db.relationship('Role', back_populates = 'users')

    serialize_rules = ('-account.users', '-account.created_at', '-account.updated_at', '-account.address_1', '-account.address_2', '-account.city', '-account.id', '-account.phone', '-account.zip_code', '-role')

    def __repr__(self):
        return f'User {self.id}, {self.first_name}, {self.last_name}, {self.username}, {self.created_at}, {self.updated_at}, {self.status}, {self.account_id}'


role_permissions = db.Table (
    'role_permissions',
    metadata,
    db.Column('role_id', db.Integer, db.ForeignKey(
        'roles.id'), primary_key=True),
    db.Column('permission_id', db.Integer, db.ForeignKey(
        'permissions.id'), primary_key=True)
)

class Role(db.Model, SerializerMixin):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)

    # relationships
    permissions = db.relationship('Permission', secondary=role_permissions, back_populates='roles')
    # permissions = db.relationship('Permission', back_populates='roles')
    users = db.relationship('User', back_populates='role')

    def __repr__(self):
        return f'Role {self.id}, {self.title}'


class Permission(db.Model, SerializerMixin):
    __tablename__ = 'permissions'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    #relationship
    roles = db.relationship('Role', secondary=role_permissions, back_populates='permissions')
    # roles = db.relationship('Role', back_populates='permissions')


    def __repr__(self):
        return f'Role {self.id}, {self.name}, {self.description}'


class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_by = db.Column(db.Integer)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    updated_by = = db.Column(db.Integer)
    notes = db.Column(db.String(500))
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))

    ## relationships
    quotes = db.relationship('Quote', back_populates = 'customers')
    account = db.relationship('Account', back_populates = 'customers')

    ##serialize
    serialize_rules = ('-account','-quotes',)

    def __repr__(self):
        return f'Customer {self.id}, {self.first_name}, {self.last_name}, {self.email}, {self.phone}, {self.created_at}, {self.created_by}, {self.updated_at}, {self.updated_by}, {self.notes}, {self.account_id}'


class Configuration(db.Model, SerializerMixin):
    __tablename__ = 'configurations'
    id = db.Column(db.Integer, primary_key = True)
    sku - db.Column(db.Integer)
    product_title = db.Column(db.String)
    product_description = db.Column(db.String)
    cost = db.Column(db.Integer)
    

class Quote(db.Model, SerializerMixin):
    __tablename__ = 'quotes'
    id = db.Column(db.Integer, primary_key = True)
    quote_number = db.Column(db.Integer)
    title = db.Column(db.string)
    discount = db.Column(db.Integer) ## Needs to reference discount from account
    savings = db.Column(db.Integer)
    markup_variable = db.Column(db.Integer)
    sale_price = db.Column(db.Integer)
    margin_percentage = db.Column(db.Integer)
    margin_dollars = db.Column(db.Integer)
    notes = db.Column(db.String(500))
    status = db.Column(db.Boolean)
    converted = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    created_by = db.Column(db.Integer)
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    updated_by = = db.Column(db.Integer)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    configuration_id = db.Column(db.Integer, db.ForeingKey('configurations.id'))
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))

    # relationships
    customer = db.relationship('Customer', back_populates = 'quotes')
    configurations = db.relationship('Congiguration', back_populates = 'quote')

    def __repr__(self):
        return f'Quote {self.id}, {self.quote_number}, {self.title}, {self.discount}, {self.savings}, {self.markup_variable}, {self.sale_price}, {self.margin_percentage}, {self.margin_dollars}, {self.notes}, {self.status}, {self.converted}, {self.created_at}, {self.created_by}, {self.updated_at}, {self.updated_by}, {self.customer_id}, {self.configuration_id}, {self.account_id}'
