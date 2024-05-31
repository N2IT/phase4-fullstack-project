import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AgentContext } from '../AgentProvider';
// import { useEffect } from 'react';

const Home = () => {

  const { agent, isLoading } = useContext(AgentContext);

  if (isLoading) {
    return <div> Loading ... </div>
  }

  return (
    <>
      <div className="account-details">
        {agent ? (
          <h2>Welcome {agent.username}!</h2>
        ) :
          <div>
            <h2>Quote Pro</h2>
            <LoginForm />
            <h3>OR<br /><br />Get Started Here:</h3>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        }
      </div>
    </>
  );
}

export default Home;

