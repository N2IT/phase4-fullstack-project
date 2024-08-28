#!/usr/bin/env python3

from flask import request, session, make_response, jsonify, render_template, send_from_directory
from flask_restful import Api, Resource
import random
# from config import app, db, api, os ## FOR LAUNCHING VIA GUNICORN (OS MISSING CAUSES ISSUE)
from config import app, db, api ## FOR PRODUCTION (OS PRESENT LAUNCHES BACKEND IN BROWSER)
from models import Account, User, Role, Permission, RolePermission, Quote, Customer, ScreenConfiguration
from seed import calculate_quote_info, update_quote_discount
from sqlalchemy.orm.session import make_transient
import copy


# just imported Account, User above
# need to write up the Routes now

# user_id = session.get("user_id")
#   if not user_id:
#       return {"error": "Unauthorized"}, 403
# create a custom decorator to conduct session check and apply to each of the resources

# # # # # # # FOR PRODUCTION ONLY # # # # # # #
# @app.route("/", defaults={"path": ""})
# @app.route("/<path:path>")
# def catch_all(path):
#     if path != "" and os.path.exists(app.static_folder + '/' + path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')

# @app.errorhandler(404)
# def not_found(e):
#     return send_from_directory(app.static_folder, 'index.html'), 404

# api = Api(app, prefix="/api")
# # # # # # # END FOR PRODUCTION ONLY # # # # # # #


# # # # # # # FOR DEV ONLY - TO RUN LOCALLY # # # # # # #
class Home(Resource):
  def get(self):
    return {'message' : 'Welcome to QP Development Database'}, 200
api.add_resource(Home, '/')
# # # # # # # END FOR DEV ONLY - TO RUN LOCALLY # # # # # # #
  
@app.before_request
def check_if_logged_in():
  if session.get('user_id') is None:
    session.clear()
    # return {'errors': 'Unauthorized Access'}, 401
  # else:
  #     print('User is logged in')
  #     print(session['user_id'])
       

class Accounts(Resource):
  def get(self):
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      accounts = [account.to_dict(rules = ('-updated_at',)) for account in Account.query.all()]

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
      discount = float(form_data.get('discount'))
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
        # db.session.close()

        return new_account.to_dict(), 201
      else:
        return {'errors' : '422: Unprocessable Entry'}, 422
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500


class AccountById(Resource):
  def get(self,id):
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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

        discount = data.get('discount')
        if discount:
          update_quote_discount(discount, id)
          calculate_quote_info()

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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get('user_id')
    # user = User.query.filter(User.id == session.get('user_id')).first()
    if user_id:
      user = User.query.filter(User.id == user_id).first()
      if user:
        return user.to_dict(rules=('-_password_hash', '-account', '-email', '-first_name', '-updated_at', '-last_name', '-created_at', '-updated_by', '-created_by')),200
      else:
        # User ID in session but user not found in database
        return {'error': 'User not found'}, 404
    else:
      # No user ID in session, hence not logged in
      return {'error': 'Unauthorized Access'}, 401


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
    return user.to_dict(rules=('-_password_hash', '-account', '-email', '-first_name', '-updated_at', '-last_name', '-created_at', '-updated_by', '-created_by')), 200

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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      form_data = request.get_json()

      quote_number = int(form_data.get('quote_number'))
      title = form_data.get('title')
      discount = float(form_data.get('discount'))
      savings = form_data.get('savings')
      markup_variable = float(form_data.get('markup_variable'))
      sale_price = form_data.get('sale_price')
      margin_percentage = form_data.get('margin_percentage')
      margin_dollars = form_data.get('margin_dollars')
      notes = form_data.get('notes')
      status = form_data.get('status')
      converted = form_data.get('converted')
      customer_id = int(form_data.get('customer_id'))
      created_by = int(form_data.get('created_by'))
      account_id = int(form_data.get('account_id'))

      errors = []

      if form_data:
        if not quote_number:
          errors.append('A quote number must be assigned')
        elif not title:
          errors.append('A title must be assigned')
        elif not discount:
          errors.append('A discount must be assigned')
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      quote = Quote.query.filter(Quote.id == id).first()
    
      if quote:
        data = request.get_json()
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      form_data = request.get_json()

      first_name = form_data.get('first_name')
      last_name = form_data.get('last_name')
      email = form_data.get('email')
      phone = form_data.get('phone')
      address_1 = form_data.get('address_1')
      address_2 = form_data.get('address_2')
      city = form_data.get('city')
      state = form_data.get('state')
      zip_code = form_data.get('zip_code')
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
          address_1 = address_1,
          address_2 = address_2,
          city = city,
          state = state,
          zip_code = zip_code,
          notes = notes,
          account_id = account_id,
          created_by = created_by,
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
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
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      screenconfigurations = [screenconfiguration.to_dict() for screenconfiguration in ScreenConfiguration.query.all()]

      if not screenconfigurations:
        return {'errors' : '204: No content available'}, 204

      return make_response(
        screenconfigurations,
        200
      )
    except ValueError as e:
      return {'errors' : str(e)}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
  
  def post(self):
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      ## retrieve form data
      form_data = request.get_json()

      project_name = form_data.get('project_name')
      unit_name = form_data.get('unit_name')
      complete_unit = form_data.get('complete_unit')
      housing = form_data.get('housing')
      side_track = form_data.get('side_track')
      hem_bar = form_data.get('hem_bar')
      fabric = form_data.get('fabric')
      motor_tube = form_data.get('motor_tube')
      unit_width = float(form_data.get('unit_width'))
      unit_height = float(form_data.get('unit_height'))
      housing_tube_size = form_data.get('housing_tube_size')
      housing_type = form_data.get('housing_type')
      motor_type = form_data.get('motor_type')
      motor_side = form_data.get('motor_side')
      power_chord = form_data.get('power_chord')
      motor_charge = float(form_data.get('motor_charge'))
      tube_charge = float(form_data.get('tube_charge'))
      housing_charge = float(form_data.get('housing_charge'))
      retention_type = form_data.get('retention_type')
      retention_cap_color = form_data.get('retention_cap_color')
      # left_retention = form_data.get('left_retention')
      # right_retention = form_data.get('right_retention')
      tracks_exact_length = form_data.get('tracks_exact_length')
      tracks_charge = float(form_data.get('tracks_charge'))
      hem_bar_type = form_data.get('hem_bar_type')
      hem_cap_color = form_data.get('hem_cap_color')
      pile_brush_style = form_data.get('pile_brush_style')
      hem_bar_charge = float(form_data.get('hem_bar_charge'))
      fabric_type = form_data.get('fabric_type')
      fabric_selection = form_data.get('fabric_selection')
      # seam_location = form_data.get('seam_location')
      # seam_location_num = form_data.get('seam_location_num')
      zipper_color = form_data.get('zipper_color')
      # usable_fabric_width = form_data.get('usable_fabric_width')
      rotate_fabric = form_data.get('rotate_fabric')
      fabric_charge = float(form_data.get('fabric_charge'))
      color_collection = form_data.get('color_collection')
      frame_color = form_data.get('frame_color')
      # powder_charge = form_data.get('powder_charge')
      list_price = float(form_data.get('list_price'))
      quote_id = int(form_data.get('quote_id'))
      created_by = int(form_data.get('created_by')) 

      # errors = []

      # if form_data:
      #   if not unit_width:
      #     errors.append('A unit width must be entered')
      #   if not unit_height:
      #     errors.append('A unit height must be entered')
      #   if not housing_tube_size:
      #     errors.append('Housing and Tube size must be selected')
      #   if not side_track:
      #     errors.append('Housing type must be selected')
      #   if not motor_type:
      #     errors.append('A motor type must be selected')
      #   if not motor_side:
      #     errors.append('Please select a motor side')
      #   if not side_track:
      #     errors.append('Housing type must be selected')
      #   if not motor_type:
      #     errors.append('A motor type must be selected')
      #   if not motor_type:
      #     errors.append('A motor type must be selected')

      #   if errors:
      #     return { 'errors' : errors }, 422
        
      
      new_screenconfiguration = ScreenConfiguration(
        project_name = project_name,
        unit_name = unit_name,
        complete_unit = complete_unit,
        housing = housing,
        side_track = side_track,
        hem_bar = hem_bar,
        fabric = fabric,
        motor_tube = motor_tube,
        unit_width = unit_width,
        unit_height = unit_height,
        housing_tube_size = housing_tube_size,
        housing_type = housing_type,
        motor_type = motor_type,
        motor_side = motor_side,
        power_chord = power_chord,
        motor_charge = motor_charge,
        tube_charge = tube_charge,
        housing_charge = housing_charge,
        retention_type = retention_type,
        retention_cap_color = retention_cap_color,
        # left_retention = left_retention,
        # right_retention = right_retention,
        tracks_exact_length = tracks_exact_length,
        tracks_charge = tracks_charge,
        hem_bar_type = hem_bar_type,
        hem_cap_color = hem_cap_color,
        pile_brush_style = pile_brush_style,
        hem_bar_charge = hem_bar_charge,
        fabric_type = fabric_type,
        fabric_selection = fabric_selection,
        # seam_location = seam_location,
        # seam_location_num = seam_location_num,
        zipper_color = zipper_color,
        # usable_fabric_width = usable_fabric_width,
        # rotate_fabric = rotate_fabric,
        fabric_charge = fabric_charge,
        color_collection = color_collection,
        frame_color = frame_color,
        # powder_charge = powder_charge,
        list_price = list_price,
        quote_id = quote_id,
        created_by = created_by,
      )

      db.session.add(new_screenconfiguration)
      db.session.commit()

      if quote_id:
        calculate_quote_info()

      return new_screenconfiguration.to_dict(), 201
    except ValueError as e:
      return {'errors' : str(e)}
    except Exception as e:
      return {'errors' : str(e)}

class ConfigurationById(Resource):
  def get(self, id):
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      screenconfiguration = ScreenConfiguration.query.filter(ScreenConfiguration.id == id).first()

      if screenconfiguration:
        return make_response(
          screenconfiguration.to_dict(),
          200
        )
      else:
        return {"errors" : "404: That configuration does not exist."}, 404
    except Exception as e:
      return {"errors": str(e)}, 500
  
  def patch(self, id):
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      screenconfiguration = ScreenConfiguration.query.filter(ScreenConfiguration.id == id).first()

      if screenconfiguration:
        data = request.get_json()

        for attr in data:
          setattr(screenconfiguration, attr, data[attr])
        
        db.session.add(screenconfiguration)
        db.session.commit()

        cost = data.get('list_price')
        if cost:
          calculate_quote_info()

        return make_response(
          screenconfiguration.to_dict(), 200
        )
      else:
        return {'errors' : '404: That configuation does not exist'}, 404
    except Exception as e:
      return {'errors' : str(e)}, 500
    except ValueError as e:
      return {'errors' : str(e)}, 404

  def delete(self, id):
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      screenconfiguration = ScreenConfiguration.query.filter(ScreenConfiguration.id == id).first()
      quote_id = screenconfiguration.quote_id

      if screenconfiguration:
        
        db.session.delete(screenconfiguration)
        db.session.commit()

        response_body = {
          'delete_successful' : True,
          'message' : f'ScreenConfiguration {id} has been deleted.'
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

        

# class AccountsDiscountGreaterTen(Resource):
#   def get(self):
#     try:
      # fetch all accounts
      # accounts = Account.query.filter(Account.discount > .10).all()
      # return [account.to_dict() for account in Account.query.all() if account.discount > .10]
      # greaterThan = [account.to_dict() for account in accounts if account.discount > .10]
      # return accounts with discount > 10 %
      # return make_response(
      #   accounts.to_dict(),
      #   200
      # )
    # except Exception as e:
    #   return {'errors' : str(e)}

class Duplicate(Resource):
  def post(self):
  
    data = request.get_json()
    variable = data.get('id')
    
    configs = ScreenConfiguration.query.all()
    origConfig = ScreenConfiguration.query.filter(ScreenConfiguration.id == variable).first()
    if origConfig:
      cloneConfig = copy.deepcopy(origConfig)
      make_transient(cloneConfig)
      cloneConfig.id = len(configs) + 2
      
      db.session.add(cloneConfig)
      db.session.commit()
      return {"message": "Configuration duplicated successfully"}, 200  # Return success response
    else:
      return {"errors": "404: That configuration does not exist"}, 404  # Properly formatted response

    # Perform the desired backend action using the variable
    # Example: result = some_function(variable)

    # Respond back to the frontend
    return jsonify({"message": "Success", "received_variable": variable})
  # def get(self, id):
    user_id = session.get("user_id")
    if not user_id:
      return {"error": "Unauthorized"}, 403
    try:
      configs = ScreenConfiguration.query.all()
      origConfig = ScreenConfiguration.query.filter(ScreenConfiguration.id == id).first()
      if origConfig:
        cloneConfig = copy.deepcopy(origConfig)
        make_transient(cloneConfig)
        cloneConfig.id = len(configs) + 2
        
        db.session.add(cloneConfig)
        db.session.commit()
        return {"message": "Configuration duplicated successfully"}, 200  # Return success response
      else:
        return {"errors": "404: That configuration does not exist"}, 404  # Properly formatted response
    except Exception as e:
      return {"errors": str(e)}, 500
    except ValueError as e:
      return {"errors": str(e)}, 404

api.add_resource(Duplicate, '/api/duplicate-configuration')
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
# api.add_resource(AccountsDiscountGreaterTen, '/accounts-greater')
# api.add_resource(ScreenConfigurations, '/screen-configurations')
# api.add_resource(ScreenConfigurationById, '/screen-configurations/<int:id>')

if __name__ == "__main__":
  app.run(port=5000, debug=True)