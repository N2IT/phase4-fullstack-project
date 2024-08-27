import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import QuotesTable from '../components/tables/QuotesTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const Quotes = () => {

  const { agent, isLoading, setQuotes, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/quotes')
      .then((r) => r.json())
      .then((quote) => setQuotes(quote))
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
                  <h2>Quotes Table</h2>
                  <QuotesTable />
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
export default Quotes;

