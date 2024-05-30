import { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AgentContext } from './AgentProvider';
import EditAccountForm from './EditAccountForm'
// import { Link } from 'react-router-dom';

const AccountById = () => {

    const { agent, setAccount } = useContext(AgentContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/accounts/${id}`)
                .then((r) => r.json())
                .then((data) => setAccount(data))
                .catch(error => console.error('Errors:', error));
        }
    }, [])

    return (
        <>
            <div className='account-details'>
                {agent ?
                    <>
                        <h2>Account Details</h2>
                        <EditAccountForm id={id} />
                    </> :
                    <div>
                        <h2>Unauthorized</h2>
                        <Link to="/">Log in</Link>
                        <h3>Get Started Here:</h3>
                        <Link to="/sign-up">Sign Up</Link>
                    </div>
                }
            </div>
        </>
    )
}

export default AccountById