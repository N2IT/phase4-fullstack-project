import LoginForm from './LoginForm'
import { Link, useOutletContext } from 'react-router-dom';
// import { useEffect } from 'react';

const Home = () => {

  const [user, setUser] = useOutletContext();

  // useEffect(() => {
  //   fetch('/api/check-session')
  //   .then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   })
  // },[])

  return (
    <>
      {user ? (
        <h2>Welcome {user.username}!</h2>
      ):
      <div>
        <h2>Quote Pro</h2>
        <LoginForm />
        <h3>OR<br /><br />Get Started Here:</h3>
        <Link to="/sign-up">Sign Up</Link>
      </div>
      }
    </>
  );
}

export default Home;

