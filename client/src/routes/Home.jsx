import LoginForm from '../components/forms/LoginForm'
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AgentContext } from '../AgentProvider';
import { Button } from '../components/ui/button'
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
          <>
            <h2 className="text-3xl font-bold underline">Welcome {agent.username}!</h2>
            <Button variant="primary">
              Click Me
            </Button>
          </>
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

