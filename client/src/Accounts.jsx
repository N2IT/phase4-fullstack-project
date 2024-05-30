import { useEffect, useContext } from 'react';
import Unauthorized from './Unauthorized';
import AccountsTable from './AccountsTable'
import { AgentContext } from './AgentProvider';

const Accounts = () => {

  const { agent, setAccounts, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((account) => setAccounts(account))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));

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
          <Unauthorized />
        </div>
      }
    </>
  );

}
export default Accounts;

