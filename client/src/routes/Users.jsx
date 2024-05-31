import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider'
import UsersTable from '../components/UsersTable'

const Users = () => {

  const { agent, users, setUsers, setIsLoading } = useContext(AgentContext);

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

  if (!users) {
    return <>
      <div className='account-details'>
        <h1> Loading... </h1>
      </div>
    </>
  }

  if (!agent) {
    return <>
      <div className='account-details'>
        <h1> Loading... </h1>
      </div>
    </>
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

