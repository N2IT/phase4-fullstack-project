#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Api, Resource

from config import app, db, api
from models import Account, User


# just imported Account, User above
# need to write up the Routes now

class Accounts(Resource):
  def get(self):
    accounts = [account.to_dict(rules = ('-id', '-updated_at')) for account in Account.query.all()]

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


api.add_resource(Accounts, '/accounts')
api.add_resource(Users, '/users')


if __name__ == "__main__":
  app.run(port=5555, debug=True)
