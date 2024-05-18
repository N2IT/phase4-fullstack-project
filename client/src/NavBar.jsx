import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create-account">Create New Account</Link>
                </li>
            </ul>


            <hr />
        </>
    )
}

export default NavBar;