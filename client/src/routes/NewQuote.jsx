
import { Link, useOutletContext } from 'react-router-dom';
// import { useEffect } from 'react';

const NewQuote = () => {

  const [user, setUser] = useOutletContext();

  return (
    <>
      <div className="account-details">
        {user ? (
          <h2>Welcome to the NewQuote page, {user.username}!</h2>
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

export default NewQuote;

