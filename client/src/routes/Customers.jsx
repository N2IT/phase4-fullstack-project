import { useEffect, useContext } from 'react';
import CustomersTable from '../components/tables/CustomersTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import LoadingPage from '../components/LoadingPage';

const Customers = () => {

  const { agent, isLoading, setCustomers, setIsLoading, customers } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/customers')
      .then((r) => r.json())
      .then((customer) => setCustomers(customer))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));

    localStorage.removeItem('account.id')
    localStorage.removeItem('account.discount')

  }, [])

  if (!customers || isLoading ) {
    return <LoadingPage />
  }

  return (
    <>
      <div className="account-details">
        <Container>
          {agent.role_id === 1 ?
            <div>
              <Card>
                <Card.Body>
                  <h2>Customers Table</h2>
                  <CustomersTable />
                </Card.Body>
              </Card>
            </div>
            : (
              <div>
                <InvalidCredentials />
              </div>
            )
          }
        </Container>
      </div>
    </>

  );

}
export default Customers;

