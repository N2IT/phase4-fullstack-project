import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import AccountsTable from '../components/AccountsTable'
import { AgentContext } from '../AgentProvider';

const Accounts = () => {

  const { agent, isLoading, setAccounts, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((account) => setAccounts(account))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));

  }, [])

  if (isLoading) {
    return <div> Loading ... </div>
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

