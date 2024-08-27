import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import ConfigurationsTable from '../components/tables/ConfigurationsTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const Configurations = () => {

  const { agent, isLoading, setConfigurations, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/configurations')
      .then((r) => r.json())
      .then((configuration) => setConfigurations(configuration))
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
        <Container>
          {agent ? (agent.role_id === 1 ?
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
          ) : (
            <div>
              <Unauthorized />
            </div>
          )

          }
        </Container>
      </div>
    </>
  );

}
export default Configurations;

