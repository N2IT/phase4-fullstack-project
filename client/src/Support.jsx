
import { Link, useOutletContext } from 'react-router-dom';
// import { useEffect } from 'react';

const Support = () => {

  const [user, setUser] = useOutletContext();

  return (
    <>
      {user ? (
        <h2>Welcome to the Support page, {user.username}!</h2>
      ):
      <div>
        <h2>Unauthorized</h2>
        <Link to="/">Log in</Link>
        <h3>Get Started Here:</h3>
        <Link to="/sign-up">Sign Up</Link>
      </div>
      }
    </>
  );
}

export default Support;

