#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Api, Resource
import random
from config import app, db, api
from models import Account, User, Role, Permission, RolePermission, Quote, Customer, Configuration
from seed import calculate_quote_info

# just imported Account, User above
# need to write up the Routes now

@app.before_request
def check_if_logged_in():
  if session.get('user_id') is None:
    session['user_id'] = None
  else:
    print('User is logged in')
    print(session['user_id'])


class Accounts(Resource):
  def get(self):
    try:
      accounts = [account.to_dict(rules = ('-updated_at',)) for account in Account.query.all()]
      # exmaple for visibility by role if account.role == 'admin'

      if not accounts:
        return {'errors' : '204: No content available'}, 204
        
      return make_response(
        accounts,
        200
        )
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500

  
  def post(self):
      try:
        form_data = request.get_json()
        
        account_number = int(random.random()*1000)
        company_name = form_data.get('company_name')
        address_1 = form_data.get('address_1')
        address_2 = form_data.get('address_2')
        city = form_data.get('city')
        state = form_data.get('state')
        zip_code = form_data.get('zip_code')
        phone = form_data.get('phone')
        discount = form_data.get('discount')
        created_by = form_data.get('created_by')

        errors = []

        if form_data:
          if not account_number:
            errors.append('An account number must be entered.')
          elif Account.query.filter(Account.account_number == account_number).first():
            errors.append('The account number must be unique.')
          elif not company_name:
            errors.append('A company name must be entered.')
          elif Account.query.filter(Account.company_name == company_name).first():
            errors.append('A company by that name already exists. Please enter another, or login in to your account.')
          elif not address_1:
            errors.append('An address must be entered.')
          elif not city:
            errors.append('Please enter the city where the business is located.')
          elif not state:
            errors.append('Please enter the state where the business is located.')
          elif not zip_code:
            errors.append('Please enter the zip code where the business is located.')
          elif not phone:
            errors.append('Please enter a phone number for your business')
          elif not discount:
            errors.append('Please enter a discount number for this account')
          
          if errors:
            return {'errors' : errors }, 422
          
          new_account = Account(
            account_number = account_number,
            company_name = company_name,
            address_1 = address_1,
            address_2 = address_2,
            city = city,
            state = state,
            zip_code = zip_code,
            phone = phone,
            discount = int(discount) / 100,
            created_by = created_by,
            status = 'active'
          )

          db.session.add(new_account)
          db.session.commit()

          return new_account.to_dict(), 201
        else:
          return {'errors' : '422: Unprocessable Entry'}, 422
      except ValueError as e:
        return {'errors' : str(e)}, 404
      except Exception as e:
        return {'errors' : str(e)}, 500


class AccountById(Resource):
  def get(self,id):
    try:
      account = Account.query.filter(Account.id == id).first()
      if account:
        return make_response(
          account.to_dict(),
          200
        )
      else:
        return {"errors": "404: That account does not exist"}, 404
    except Exception as e:
        return {"errors": str(e)}, 500

  def patch(self,id):
    try:
      account = Account.query.filter(Account.id == id).first()
      if account:
        data = request.get_json()
        for attr in data:
          setattr(account, attr, data[attr])
        
        # if data.get('status') == 'inactive':
        #   return {'NOTICE' : 'YOUR ACCOUNT IS BEING SET TO INACTIVE!'}
        
        db.session.add(account)
        db.session.commit()

        return make_response(
          account.to_dict(), 
          200
        )
      else:
        return {'errors' : 'That account does not exist'}, 404
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
  
  def delete(self, id):
    try:
      account = Account.query.filter(Account.id == id).first()
      if account:
        db.session.delete(account)
        db.session.commit()
        response_body = {
          'delete successful' : True,
          "message" : f'Account {id} and all associated users, customers, quotes have been deleted.'
        }
        return make_response(
          response_body,
          200
        )
      else:
        return {'errors' : '404: That account does not exist'}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
    except ValueError as e:
      return {'errors' : str(e)}, 404


class UserById(Resource):
  def get(self,id):
    try:
      user = User.query.filter(User.id == id).first()
      if user:
        return make_response(
          user.to_dict(rules = ('-_password_hash',)),
          200
        )
      else:
        return {"errors": "404: That user does not exist"}, 404
    except Exception as e:
        return {"errors": str(e)}, 500

  def patch(self, id):
    try:
      user = User.query.filter(User.id == id).first()
      if user:
        data = request.get_json()
        for attr in data:
          setattr(user, attr, data[attr])

        db.session.add(user)
        db.session.commit()

        return make_response(
          user.to_dict(),
          200
        )
      else:
        return {'errors' : 'That user does not exist'}
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
  
  def delete(self, id):
    try:
      user = User.query.filter(User.id == id).first()
      if user:
        db.session.delete(user)
        db.session.commit()

        response_body = {
          'delete successful' : True,
          'message' : f'User {id} has been deleted'
        }

        return make_response(
          response_body,
          200
        )

      else:
        return {'errors' : '404: That user does not exist'}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
    except ValueError as e:
      return {'errors' : str(e)}, 404
    

class Users(Resource):
  def get(self):
    try:
      users = [user.to_dict(rules = ('-_password_hash',)) for user in User.query.all()]

      if not users:
        return {'error' : '204: No content available'}, 204

      return make_response(
        users,
        200
      )
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
  
  def post(self):
    try:
      form_data = request.get_json()

      first_name = form_data.get('first_name')
      last_name = form_data.get('last_name')
      username = form_data.get('username')
      email = form_data.get('email')
      account_id = form_data.get('account_id')
      password = form_data.get('password_hash')
      role_id = form_data.get('role_id')

      errors = []

      if form_data:
        if not first_name:
          errors.append('A first name must be entered.')
        elif not last_name:
          errors.append('Please enter a last name.')
        elif not username:
          errors.append('Please enter a username.')
        elif User.query.filter(User.username == username).first():
          errors.append('That username is already in use. Please try again.')
        elif not email:
          errors.append('Please enter an email')
        elif User.query.filter(User.email == email).first():
          errors.append('This email is already in use. Please enter another email address or return to the homepage to login to your profile.')
        elif not role_id:
          errors.append('Please select a role for the user')
        
        if errors:
          return {'errors' : errors }, 422
        
        if 'username' in form_data:
          new_user = User(
            first_name = first_name,
            last_name = last_name,
            username = username,
            email = email,
            status = 'active',
            account_id = account_id,
            role_id = role_id,
          )        

          new_user.password_hash = form_data['password']

          db.session.add(new_user)
          db.session.commit()

          if session.get('user_id'):
            session['user_id'] = session.get('user_id')
          else:
            session['user_id'] = new_user.id

          return new_user.to_dict(), 201
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
    

class CheckSession(Resource):
  def get(self):
    user = User.query.filter(User.id == session.get('user_id')).first()
    if user:
      return user.to_dict(),200
    
    else:
        return {}, 204


class Login(Resource):
  def post(self):
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter(User.username == username).first()

    if user is None or not user.authenticate(password):
      return {'errors': 'Invalid username or password'}, 401

    if user:
      if user.status == 'inactive':
        return {'errors' : 'This users account is no longer active.'}, 401

    session['user_id'] = user.id
    return user.to_dict(), 200

class Logout(Resource):
  def delete(self):
    # for cookie in request.cookies:
    #   resp = make_response('')
    #   resp.set_cookie(cookie,expires=0)
    if session.get('user_id'):
      session['user_id'] = None
    if session.get('account_id'):
      session['account_id'] = None
    if session.get('customer_id'):
      session['customer_id'] = None
    return {}, 204


class Quotes(Resource):
  def get(self):
    try:
      quotes = [quote.to_dict() for quote in Quote.query.all()]

      if not quotes:
        return {'error' : '204: No content available'}, 204

      return make_response(
        quotes,
        200
      )
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500

  def post(self):
    try:
      form_data = request.get_json()

      quote_number = form_data.get('quote_number')
      title = form_data.get('title')
      discount = form_data.get('discount')
      savings = form_data.get('savings')
      markup_variable = form_data.get('markup_variable')
      sale_price = form_data.get('sale_price')
      margin_percentage = form_data.get('margin_percentage')
      margin_dollars = form_data.get('margin_dollars')
      notes = form_data.get('notes')
      status = form_data.get('status')
      converted = form_data.get('converted')
      customer_id = form_data.get('customer_id')
      created_by = form_data.get('created_by')
      account_id = form_data.get('account_id')

      errors = []

      if form_data:
        if not quote_number:
          errors.append('A quote number must be assigned')
        elif not title:
          errors.append('A title must be assigned')
        elif not discount:
          errros.append('A discount must be assigned')
        # elif not savings:
        #   errors.append('Savings must be applied')
        # elif not sale_price:
        #   errors.append('A sale price must be entered')
        elif not status:
          errors.append('A status must be applied')
        # elif not converted:
        #   errors.append('A converted status value must be applied')
        elif not customer_id:
          errors.append('A customer id must be applied')
        elif not account_id:
          errors.append('An account id must be applied')
        
        if errors:
          return {'errors' : errors }, 422

        new_quote = Quote(
          quote_number = quote_number,
          title = title,
          discount = discount,
          savings = savings,
          markup_variable = markup_variable,
          sale_price = sale_price,
          margin_percentage = margin_percentage,
          margin_dollars = margin_dollars,
          notes = notes,
          status = status,
          converted = converted,
          created_by = created_by,
          customer_id = customer_id,
          account_id = account_id
        )

        db.session.add(new_quote)
        db.session.commit()

        return new_quote.to_dict(), 201
        
      else:
        return {'errors' : '422: Unprocessable Entry'}, 422
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500      


class QuoteById(Resource):
  def get(self, id):
    try:
      quote = Quote.query.filter(Quote.id == id).first()

      if quote:
        return make_response(
          quote.to_dict(),
          200
        )
      else:
        return {"errors": "404: That quote does not exist"}, 404
    except Exception as e:
      return {"errors": str(e)}, 500
  

  def patch(self, id):
    # breakpoint()
    try:
      quote = Quote.query.filter(Quote.id == id).first()
    
      if quote:
        data = request.get_json()
        # breakpoint()
        if data:
          for attr in data:
            setattr(quote, attr, data[attr])

          db.session.add(quote)
          db.session.commit()
        
          mu_variable = data.get('markup_variable')
          if mu_variable:
            calculate_quote_info()

          return make_response(
              quote.to_dict(), 
              200
            )
        else:
          return {'errors' : 'There are no changes to commit'}
      else:
        return {'errors' : 'That quote does not exist'}, 404
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500

  def delete(self, id):
    try:
      quote = Quote.query.filter(Quote.id == id).first()

      if quote:
        db.session.delete(quote)
        db.session.commit()

        response_body = {
          'delete_successful' : True,
          'message' : f'Quote {id} and its assigned configurations have been deleted.'
        }

        return make_response(
          response_body,
          200
        ) 
      else:
        return {'errors' : '404:That quote does not exist'}, 404
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500


class Customers(Resource):
  def get(self):
    try:
      customers = [quote.to_dict() for quote in Customer.query.all()]

      if not customers:
        return {'error' : '204: No content available'}, 204

      return make_response(
        customers,
        200
      )
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
  
  def post(self):
    try:
      form_data = request.get_json()

      first_name = form_data.get('first_name')
      last_name = form_data.get('last_name')
      email = form_data.get('email')
      phone = form_data.get('phone')
      notes = form_data.get('notes')
      account_id = form_data.get('account_id')
      created_by = form_data.get('created_by')

      errors = []

      if form_data:
        if not first_name:
          errors.append('A first name must be entered')
        elif not last_name:
          errors.append('A last name must be entered')
        elif not email:
          errors.append('An email must be entered')
        elif Customer.query.filter(Customer.email == email).first():
          errors.append('This email is alread in use. Please try a different email address.')
        elif not phone:
          errors.append('A phone number must be entered')
        elif Customer.query.filter(Customer.phone == phone).first():
          errors.append('This phone number is already on record.')
        elif not account_id:
          errors.append('Customer not assiged to an account')
        
        if errors:
          return {
            'errors' : errors 
          }, 422

        new_customer = Customer(
          first_name = first_name,
          last_name = last_name,
          email = email,
          phone = phone,
          notes = notes,
          account_id = account_id,
          created_by = created_by
        )

        db.session.add(new_customer)
        db.session.commit()

        return new_customer.to_dict(), 201
      
      else:
        return {'errors' : '422: Unprocessable Entry'}, 422
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500


class CustomerById(Resource):
  def get(self, id):
    try:
      customer = Customer.query.filter(Customer.id == id).first()

      if customer:
        return make_response(
          customer.to_dict(),
          200
        )
      else:
        return {"errors": "404: That customer does not exist"}, 404
    except Exception as e:
      return {"errors": str(e)}, 500

  def patch(self, id):
    try:
      customer = Customer.query.filter(Customer.id == id).first()
      if customer:
        data = request.get_json()
        for attr in data:
          setattr(customer, attr, data[attr])
        
        db.session.add(customer)
        db.session.commit()

        return make_response(
          customer.to_dict(), 200
        )
      else:
        return {'errors' : '404 : That quote does not exist'}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
    except ValueError as e:
      return {'errors' : str(e)}, 404
  
  def delete(self, id):
    try:
      customer = Customer.query.filter(Customer.id == id).first()

      if customer:
        db.session.delete(customer)
        db.session.commit()

        response_body = {
          'delete_successful' : True,
          'message' : f'Customer {id} and all associated quotes have been deleted'
        }

        return make_response(
          response_body,
          200
        )
      else:
        return {'errors' : '404:That cusotmer does not exist'}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
    except ValueError as e:
      return {'errors' : str(e)}, 404

class Configurations(Resource):
  def get(self):
    try:
      configurations = [configuration.to_dict() for configuration in Configuration.query.all()]

      if not configurations:
        return {'error' : '204: No content available'}, 204

      return make_response(
        configurations,
        200
      )
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
  
  def post(self):
    try:
      ## retrieve form data
      form_data = request.get_json()

      sku = form_data.get('sku')
      product_title = form_data.get('product_title')
      product_description = form_data.get('product_description')
      cost = form_data.get('cost')
      if session.get('quote_id'):
        quote_id = session['quote_id']
      else:
        quote_id = form_data.get('quote_id')

      errors = []

      if form_data:
        if not sku:
          errors.append('A sku must be entered')
        if not product_title:
          errors.append('A product title must be entered')
        if not product_description:
          errors.append('A product description must be entered')
        if not cost:
          errors.append('An account id must be associated with the configuration')
        
        if errors:
          return { 'errors' : errors }, 422
        
        new_configuration = Configuration(
          sku = sku,
          product_title = product_title,
          product_description = product_description,
          cost = cost,
          quote_id = quote_id
        )

        db.session.add(new_configuration)
        db.session.commit()

        return new_configuration.to_dict(), 201
    except ValueError as e:
      return {'errors' : str(e)}
    except Exception as e:
      return {'errors' : str(e)}

class ConfigurationById(Resource):
  def get(self, id):
    try:
      configuration = Configuration.query.filter(Configuration.id == id).first()

      if configuration:
        return make_response(
          configuration.to_dict(),
          200
        )
      else:
        return {"errors" : "404: That configuration does not exist."}, 404
    except Exception as e:
      return {"errors": str(e)}, 500
  
  def patch(self, id):
    try:
      configuration = Configuration.query.filter(Configuration.id == id).first()

      if configuration:
        data = request.get_json()

        for attr in data:
          setattr(configuration, attr, data[attr])
        
        db.session.add(configuration)
        db.session.commit()

        cost = data.get('cost')
        if cost:
          calculate_quote_info()
          ## this is temporary - don't know if a server side calc is good or not 
          ## may want to do so from frontend

        return make_response(
          configuration.to_dict(), 200
        )
      else:
        return {'errors' : '404: That configuation does not exist'}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
    except ValueError as e:
      return {'errors' : str(e)}, 404

  def delete(self, id):
    try:
      configuration = Configuration.query.filter(Configuration.id == id).first()
      quote_id = configuration.quote_id

      if configuration:
        
        db.session.delete(configuration)
        db.session.commit()

        response_body = {
          'delete_successful' : True,
          'message' : f'Configuration {id} has been deleted.'
        }

        calculate_quote_info(quote_id)
 
        return make_response(
          response_body,
          200
        )
      else:
        {'errors' : '404:That configuration does not exist'}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
    except ValueError as e:
      return {'errors' : str(e)}, 404


api.add_resource(Accounts, '/accounts')
api.add_resource(AccountById, '/accounts/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check-session')
api.add_resource(Logout, '/logout')
api.add_resource(Quotes, '/quotes')
api.add_resource(QuoteById, '/quotes/<int:id>')
api.add_resource(Customers, '/customers')
api.add_resource(CustomerById, '/customers/<int:id>')
api.add_resource(Configurations, '/configurations')
api.add_resource(ConfigurationById, '/configurations/<int:id>')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
