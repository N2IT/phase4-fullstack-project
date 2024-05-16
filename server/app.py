#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource

from config import app, db, api
from models import Account, User


# just imported Account, User above
# need to write up the Routes now

class Accounts(Resource):
  def get(self):
    accounts = [account.to_dict() for account in Accounts.query.all()]

    if accounts:
      return make_response(accounts, 200)

    return {'error' : '204: No content available'}

if __name__ == "__main__":
  app.run(port=5555, debug=True)
