import LoginForm from './LoginForm'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div>
        <h2>Quote Pro</h2>
        <LoginForm />
        <h3>OR<br />Create your account here:</h3>
        <Link to = "/create-account">Create Your Account</Link>
      </div>
    );
  }

  export default Home;

  