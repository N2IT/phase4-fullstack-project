
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AgentContext } from '../AgentProvider';
// import { useEffect } from 'react';

const Support = () => {

  const { agent, isLoading } = useContext(AgentContext)

  if (isLoading) {
    return <div> Loading ... </div>
  }

  return (
    <>
      <div className="account-details">
        {agent ? (
          <h2>Welcome to the Support page, {user.username}!</h2>
        ) :
          <div>
            <h2>Unauthorized</h2>
            <Link to="/">Log in</Link>
            <h3>Get Started Here:</h3>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        }
      </div>
    </>
  );
}

export default Support;

