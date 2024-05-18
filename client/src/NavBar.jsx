import { Link } from 'react-router-dom'

const NavBar = () => {
    <>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create-account">Create New Account</Link>
                </li>
            </ul>
        </nav>

        <hr />
    </>
}

export default NavBar