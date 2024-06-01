import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider'
import UsersTable from '../components/UsersTable'

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
  }, [])


  if (isLoading) {
    return <div> Loading ... </div>
  }


  return (
    <>
      <div className="account-details">
        {agent ?
          <div>
            <h2>Welcome to the Users page, {agent.username}!</h2>
            <UsersTable />
          </div>
          :
          <div>
            <Unauthorized />
          </div>
        }
      </div>
    </>
  );
}

export default Users;

