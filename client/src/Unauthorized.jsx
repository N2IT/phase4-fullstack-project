import { Link } from "react-router-dom"

const Unauthorized = () => {
    return (
        <div className="account-details">
            <h2>Unauthorized</h2>
            <Link to="/">Log in</Link>
            <h3>Get Started Here:</h3>
            <Link to="/sign-up">Sign Up</Link>

        </div>
    )
}

export default Unauthorized