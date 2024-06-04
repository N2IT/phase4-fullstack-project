import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import AccountsTable from '../components/AccountsTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';

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
      <div className="account-details">
        {agent ? (agent.role_id === 1 ?
          <div>
            <h2>Account Table</h2>
            <AccountsTable />
          </div>
          : (
            <div>
              <InvalidCredentials />
            </div>
          )
        ) : (
          <div>
            <Unauthorized />
          </div>
        )

        }
      </div>
    </>
  );

}
export default Accounts;

