
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Unathorized from './Unathorized';
// import AccountsTable from './AccountsTable'

const Accounts = () => {

  const [agent, setAgent, user, setUser, accounts, setAccounts, accountForm, setAccountForm, onSubmitAccountForm, errors, setErrors, handleIdClick, valueId, setValueId, isLoading, setIsLoading, disabled, setAsDisabled, handleEditClick, status, setStatus] = useOutletContext();

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((account) => setAccounts(account))
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
        <div>
          <Unathorized />
        </div>
      }
    </>
  );

}
export default Accounts;

