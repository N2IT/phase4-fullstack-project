import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import AccountsTable from '../components/AccountsTable'
import { AgentContext } from '../AgentProvider';

const Accounts = () => {

  const { agent, accounts, setAccounts, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((account) => setAccounts(account))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));

  }, [])

  if (!agent) {
    return <>
        <div className='account-details'>
            <h1> Loading... </h1>
        </div>
    </>
}

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
          <Unauthorized />
        </div>
      }
    </>
  );

}
export default Accounts;

