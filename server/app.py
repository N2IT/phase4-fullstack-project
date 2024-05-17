#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Api, Resource

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

    
class Users(Resource):
  def get(self):
    users = [user.to_dict(rules = ('-account_id','-id', '-updated_at', '-_password_hash')) for user in User.query.all()]

    if not users:
      return {'error' : '204: No content available'}, 204

    return make_response(
      users,
      200
    )


class CreateAccount(Resource):
  def post(get):
    form_data = request.get_json()
    
    account_number = form_data.get('account_number')
    company_name = form_data.get('company_name')

    errors = []

    if form_data:
      if not account_number:
        errors.append('An account number must be entered.')
      elif Account.query.filter(Account.account_number == account_number).first():
        errors.append('The account number must be unique.')
      elif not company_name:
        errors.append('An company name must be entered.')
      elif Account.query.filter(Account.company_name == company_name).first():
        errors.append('The company name must be unique.')
      
      if errors:
        return {'errors' : errors }, 422
      
      new_account = Account(
        account_number = account_number,
        company_name = company_name
      )

      db.session.add(new_account)
      db.session.commit()

      return new_account.to_dict(), 201

    else:
      return {'errors' : '422: Unprocessable Entry'}, 422


api.add_resource(Accounts, '/accounts')
api.add_resource(Users, '/users')
api.add_resource(CreateAccount, '/create_account')


if __name__ == "__main__":
  app.run(port=5555, debug=True)
