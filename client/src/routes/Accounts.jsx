import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import AccountsTable from '../components/tables/AccountsTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import LoadingPage from '../components/LoadingPage';

const Accounts = () => {

  const { agent, accounts, navigate, setAccounts, isLoading, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/accounts')
      .then((r) => r.json())
      .then((account) => setAccounts(account))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));

  }, [agent])

  if (!accounts || isLoading ) {
    return <LoadingPage />
  }

  return (
    <>
      <div className="account-details">
          <Container>
            <Row className='mb-3'>
              <Col md={4} sm={12}>
                <div>
                  <h2>Account Table</h2>
                </div>
              </Col>
              <Col>
                <div className="d-flex justify-content-end gap-2">
                  <Button onClick={() => navigate('/create-new-account')}>Create New Account</Button>
                </div>
              </Col>
            </Row>
            <Card className='mb-3'>
              {isLoading ? <LoadingPage />
                :
              <Card.Body>
                <AccountsTable />
              </Card.Body>
              }
            </Card>
          </Container>
          )
      </div>
    </>
  );

}
export default Accounts;