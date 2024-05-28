
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AccountsTable from './AccountsTable'

const Accounts = () => {

  const [user, setUser, accounts, setAccounts, accountForm, setAccountForm, onSubmitAccountForm, errors, setErrors, handleIdClick, valueId, setValueId, isLoading, setIsLoading, disabled, setAsDisabled, handleEditClick] = useOutletContext();
  
  

  // debugger

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((data) => setAccounts(data))
      .then(() => setIsLoading(false))
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <>
      {user ?
        <div>
          <h2>Welcome to the Accounts page, {user.username}!</h2>
          <AccountsTable />
        </div>
        :
        <div>
        <h2>Unauthorized</h2>
        <Link to="/">Log in</Link>
        <h3>Get Started Here:</h3>
        <Link to="/sign-up">Sign Up</Link>
      </div>
      }
    </>
  );
}

export default Accounts;

