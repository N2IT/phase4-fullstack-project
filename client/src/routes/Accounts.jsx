import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import AccountsTable from '../components/tables/AccountsTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

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
          <Container>
            <Row>
              <Col md={4} sm={12}>
                <div>
                  <h2>Account Table</h2>
                </div>
              </Col>
              <Col md={4} sm={12}>
                <div>
                  <Button onClick={() => navigate('/create-new-account')}>Create New Account</Button>
                </div>
              </Col>
              <Col>
                <AccountsTable />
              </Col>
            </Row>
          </Container>

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