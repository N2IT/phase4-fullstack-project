#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Api, Resource

from config import app, db, api
from models import Account, User


# just imported Account, User above
# need to write up the Routes now

class Accounts(Resource):
  def get(self):
    accounts = [account.to_dict() for account in Account.query.all()]

    if not accounts:
      return {'error' : '204: No content available'}, 204
      
    return make_response(
      accounts,
      200
      )

    

api.add_resource(Accounts, '/accounts')

if __name__ == "__main__":
  app.run(port=5555, debug=True)
