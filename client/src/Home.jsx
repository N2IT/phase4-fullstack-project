import LoginForm from './LoginForm'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div>
        <h2>Quote Pro</h2>
        <LoginForm />
        <h3>OR<br /><br />Get Started Here:</h3>
        <Link to = "/sign-up">Sign Up</Link>
      </div>
    );
  }

  export default Home;

  