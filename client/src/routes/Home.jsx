import LoginForm from '../components/forms/LoginForm'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AgentContext } from '../AgentProvider';
import { Container } from 'react-bootstrap';
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
          <Container className='form-width'>
            <h2>Welcome {agent.username}!</h2>
          </Container>
        ) :
          <Container className='form-width'>
            <div>
              <h2>Quote Pro</h2>
              <LoginForm />
              <h3>OR<br /><br />Get Started Here:</h3>
              <Link to="/sign-up">Sign Up</Link>
            </div>
          </Container>
        }
      </div>
    </>
  );
}

export default Home;

