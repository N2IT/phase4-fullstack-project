import { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AgentContext } from './AgentProvider';
import EditAccountForm from './EditAccountForm'
import Unauthorized from './Unauthorized';
// import { Link } from 'react-router-dom';

const AccountById = () => {

    const { agent, setAccount, setAsDisabled } = useContext(AgentContext);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/accounts/${id}`)
                .then((r) => r.json())
                .then((data) => setAccount(data))
                .then(() => setAsDisabled(true))
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
                        <Unauthorized />
                    </div>
                }
            </div>
        </>
    )
}

export default AccountById