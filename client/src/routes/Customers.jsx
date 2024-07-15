import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import CustomersTable from '../components/tables/CustomersTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';

const Customers = () => {

  const { agent, isLoading, setCustomers, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/customers')
      .then((r) => r.json())
      .then((customer) => setCustomers(customer))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));
    
    localStorage.removeItem('account.id')
    localStorage.removeItem('account.discount')

  }, [])

  if (isLoading) {
    return <div> Loading ... </div>
  }

  return (
    <>
      <div className="account-details">
        {agent ? (agent.role_id === 1 ?
          <div>
            <h2>Customers Table</h2>
            <CustomersTable />
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
export default Customers;

