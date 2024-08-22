import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import AccountsTable from '../components/tables/AccountsTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';
import { Button } from '@/components/ui/button';

const Accounts = () => {

  const { agent, accounts, navigate, setAccounts, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((account) => setAccounts(account))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));

  }, [agent])

  if (!accounts) {
    return <div> Loading ... </div>
  }

  return (
    <>
      <div className="account-details">
        {agent ? (agent.role_id === 1 ?
          <>
            <div className="flex lg:items-center space-evenly">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Accounts Table</h2>
              </div>
              <div className="flex lg:ml-4 lg:mt-0">
                <span>
                  <Button onClick={() => navigate('/create-new-account')}>Create New Account</Button>
                </span>
              </div>
            </div>
            <AccountsTable />
          </>
          : (
            <div>
              <InvalidCredentials />
            </div>
          )
        ) : (
          <div>
            <Unauthorized />
          </div>
        )}
      </div >
    </>
  );

}
export default Accounts;