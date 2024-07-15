import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider'
import UsersTable from '../components/tables/UsersTable'
import InvalidCredentials from '../components/InvalidCredentials';

const Users = () => {

  const { agent, setUsers, setIsLoading, isLoading } = useContext(AgentContext);

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

  if (isLoading) {
    return <div> Loading ... </div>
  }

  return (
    <>
    <div className="account-details">
        {agent ? (agent.role_id === 1 ?
          <div>
            <h2>Users Table</h2>
            <UsersTable />
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

export default Users;

