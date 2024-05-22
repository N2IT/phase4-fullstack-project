#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Api, Resource
import random
from config import app, db, api
from models import Account, User


# just imported Account, User above
# need to write up the Routes now

class Accounts(Resource):
  def get(self):
    accounts = [account.to_dict(rules = ('-id', '-updated_at',)) for account in Account.query.all()]

    if not accounts:
      return {'error' : '204: No content available'}, 204
      
    return make_response(
      accounts,
      200
      )
  
  def post(self):
    form_data = request.get_json()
    
    account_number = int(random.random()*1000)
    company_name = form_data.get('company_name')
    city = form_data.get('city')
    state = form_data.get('state')
    
    

    errors = []

    if form_data:
      if not account_number:
        errors.append('An account number must be entered.')
      elif Account.query.filter(Account.account_number == account_number).first():
        errors.append('The account number must be unique.')
      elif not company_name:
        errors.append('A company name must be entered.')
      elif Account.query.filter(Account.company_name == company_name).first():
        errors.append('The company name must be unique.')
      
      if errors:
        return {'errors' : errors }, 422
      
      new_account = Account(
        account_number = account_number,
        company_name = company_name,
        city = city,
        state = state,
        status = True
      )

      db.session.add(new_account)
      db.session.commit()

      session['account_id'] = new_account.id


      return new_account.to_dict(), 201

    else:
      return {'errors' : '422: Unprocessable Entry'}, 422

    
class Users(Resource):
  def get(self):
    users = [user.to_dict(rules = ('-account_id','-id', '-updated_at', '-_password_hash')) for user in User.query.all()]

    if not users:
      return {'error' : '204: No content available'}, 204

    return make_response(
      users,
      200
    )
  
  def post(self):
    form_data = request.get_json()
    
    first_name = form_data.get('first_name')
    last_name = form_data.get('last_name')
    username = form_data.get('username')
    email = form_data.get('email')
    if session['account_id']:
      account_id = session['account_id']
    # account_id = form_data.get('account_id')
    password = form_data.get('password_hash')

    errors = []

    if form_data:
      if not first_name:
        errors.append('A first name must be entered.')
      elif not last_name:
        errors.append('An last name must be entered.')
      elif not username:
        errors.append('A username must be entered.')
      elif User.query.filter(User.username == username).first():
        errors.append('The username is already in use. Please try again.')
      elif not email:
        errors.append('Please enter an email for this user')
      elif User.query.filter(User.email == email).first():
        errors.append('This email is already being used')
      
      if errors:
        return {'errors' : errors }, 422
      
      if 'username' in form_data:
        new_user = User(
          first_name = first_name,
          last_name = last_name,
          username = username,
          email = email,
          status = True,
          account_id = account_id
        )        

        new_user.password_hash = form_data['password']

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        return new_user.to_dict(), 201

    else:
      return {'errors' : '422: Unprocessable Entry'}, 422


class CheckSession(Resource):
  def get(self):
    if session['user_id']:
      user = User.query.filter(User.id == session.get('user_id')).first()
      return user.to_dict(), 200
    else:
      return {'errors' : '401 : Unauthorized'}, 401


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter(User.username == username).first()

        if user is None or not user.authenticate(password):
            return {'errors': 'Invalid username or password'}, 401

        session['user_id'] = user.id
        return user.to_dict(), 200

class Logout(Resource):
  def delete(self):
    if session.get('user_id'):
      session['user_id'] = None
      return {}, 204


    

api.add_resource(Accounts, '/accounts')
api.add_resource(Users, '/users')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check-session')
api.add_resource(Logout, '/logout')



if __name__ == "__main__":
  app.run(port=5555, debug=True)
