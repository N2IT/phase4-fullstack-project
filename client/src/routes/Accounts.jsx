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
            <div class="lg:flex lg:items-center lg:justify-between">
              <div class="flex lg:ml-4 lg:mt-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Account Table</h2>
              </div>
              <div class="flex lg:ml-4 lg:mt-0">
                <span class="sm:ml-3">
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