import { useEffect, useContext } from 'react';
import Unathorized from './Unathorized';
import { AgentContext } from './AgentProvider'
import UsersTable from './UsersTable'

const Users = () => {

  const { agent, setUsers, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then((data) => setUsers(data))
      .then(() => setIsLoading(false))
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <>
      <div className="account-details">
        {agent ?
          <div>
            <h2>Welcome to the Users page, {agent.username}!</h2>
            {/* <UsersTable /> */}
          </div>
          :
          <div>
            <Unathorized />
          </div>
        }
      </div>
    </>
  );
}

export default Users;

