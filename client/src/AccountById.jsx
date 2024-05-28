import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import EditAccountForm from './EditAccountForm'
import { Link } from 'react-router-dom';

const AccountById = () => {

    const [user] = useOutletContext()
    const { id } = useParams();
    const [account, setAccount] = useState(null)

    useEffect(() => {
        if (id) {
            fetch(`/api/accounts/${id}`)
                .then((r) => r.json())
                .then((data) => setAccount(data))
                .catch(error => console.error('Errors:', error));
        }
    }, [user])



    return (
        <>
            <div className='account-details'>
                <h2>Account Details</h2>
                {account ? (user ? <EditAccountForm id={id} account={account} setAccount={setAccount} /> :
                    <div>
                        <h2>Unauthorized</h2>
                        <Link to="/">Log in</Link>
                        <h3>Get Started Here:</h3>
                        <Link to="/sign-up">Sign Up</Link>
                    </div>) : null}
            </div>
        </>
    )
}

export default AccountById