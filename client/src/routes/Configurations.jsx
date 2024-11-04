import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import ConfigurationsTable from '../components/tables/ConfigurationsTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import LoadingPage from '../components/Loading';

const Configurations = () => {

  const { agent, isLoading, setConfigurations, setIsLoading, configurations } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/configurations')
      .then((r) => r.json())
      .then((configuration) => setConfigurations(configuration))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));

    localStorage.removeItem('account.id')
    localStorage.removeItem('account.discount')

  }, [])

  if (!configurations || isLoading ) {
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
                  <h2>Configurations Table</h2>
                  <ConfigurationsTable />
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
export default Configurations;

