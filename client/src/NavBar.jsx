import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/sign-up">Sign Up</Link>
                </li>
            </ul>


            <hr />
        </>
    )
}

export default NavBar;