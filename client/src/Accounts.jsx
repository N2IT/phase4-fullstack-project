
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AccountsTable from './AccountsTable'

const Accounts = () => {

  const [agent, setAgent, user, setUser, accounts, setAccounts, accountForm, setAccountForm, onSubmitAccountForm, errors, setErrors, handleIdClick, valueId, setValueId, isLoading, setIsLoading, disabled, setAsDisabled, handleEditClick] = useOutletContext();

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => {
        if (!r.ok) {
          r.json()
            .then((data) => {
              setErrors(data)
            })
        }
        return r.json()
          .then((data) => setAccounts(data))
          .then(() => setIsLoading(false))
          .catch(error => console.error('Error:', error))
      })
    // .then((r) => r.json())
    // .then((data) => setAccounts(data))
    // .then(() => setIsLoading(false))
    // .catch(error => console.error('Error:', error));
  }, [])

  // WORKING OUT AUTHORIZATION IN THE BACKEND. NEED TO REFLECT AUTHORIZATION ERRORS ON FRONTEND WHEN ACCESS FAILS

  // NEED TO UPDATE USER TO AGENT FOR LOGIN AND PERSIST AGENT ACROSS APP - UPDATE NAV TO INCLUDE 'WELCOME, (AGENT)'

  return (
    <>
      {agent ?
        <div className="account-details">
          <div>
            <h2>Account Table will show here</h2>
          </div>
        </div> :
        <div className='account-details'>
          <h2>{errors.errors}</h2>
          <div>
            <h2>Return to Login Screen</h2>
            <p><Link to='/'>Login</Link></p>
            <h3>OR<br /><br />Get Started Here:</h3>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        </div>
      }
    </>
  );
}

export default Accounts;

