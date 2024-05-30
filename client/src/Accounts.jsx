import { useEffect, useState, useContext } from 'react';
import Unathorized from './Unathorized';
import AccountsTable from './AccountsTable'
import { AgentContext } from './AgentProvider';

const Accounts = () => {

  const { agent, setAccounts } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((account) => setAccounts(account))
  }, [])

  return (
    <>
      {agent ?
        <div className="account-details">
          <div>
            <h2>Account Table</h2>
            <AccountsTable />
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

