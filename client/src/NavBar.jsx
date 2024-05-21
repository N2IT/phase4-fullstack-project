import { Link } from 'react-router-dom'

const NavBar = ({ user, setUser }) => {

    return (
        <>
            {user ? <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/sign-up">Sign Up</Link>
                </li>
            </ul> :
            null
            }
        </>
    )
}

export default NavBar;