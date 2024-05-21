import { Link } from 'react-router-dom'

const NavBar = ({ user, setUser }) => {

    const handleLogoutClick = () => {
        fetch("/api/logout", {
            method: 'DELETE'
        })
            .then((r) => {
                if (r.ok) {
                    setUser(null)
                }
            })
    }

    return (
        <>
            {user ?
                <ul>
                    <li>
                        <button onClick={handleLogoutClick}>Logout</button>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to ="/accounts">Accounts</Link>
                    </li>
                    <li>
                        <Link to ="/users">Users</Link>
                    </li>
                    <li>
                        <Link to ="/quotes">Quotes</Link>
                    </li>
                    <li>
                        <Link to ="/new-quote">New Quote</Link>
                    </li>
                    <li>
                        <Link to ="/support">Support</Link>
                    </li>

                </ul> :
                null
            }
        </>
    )
}

export default NavBar;