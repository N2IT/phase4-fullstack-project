import { useEffect, useContext } from 'react';
import { AgentContext } from '../AgentProvider'
import UsersTable from '../components/tables/UsersTable'
import InvalidCredentials from '../components/InvalidCredentials';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import LoadingPage from '../components/LoadingPage';

const Users = () => {

  const { agent, users, setUsers, setIsLoading, isLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        }
        else
          setUsers(data)
      })
      .then(() => setIsLoading(false))
      .catch(error => console.error('Error:', error));

    localStorage.removeItem('account.id')
    localStorage.removeItem('account.discount')

  }, [])

  if (!users || isLoading ) {
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
                  <h2>Users Table</h2>
                  <UsersTable />
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

export default Users;

