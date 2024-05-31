import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgentContext } from './AgentProvider';
import EditAccountForm from './EditAccountForm'
import Unauthorized from './Unauthorized';
// import { Link } from 'react-router-dom';

const AccountById = () => {

    const { agent, account, setAccount, setAsDisabled, errors, setErrors } = useContext(AgentContext);
    const { id } = useParams();

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/accounts/${id}`)

            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setAccount(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setAccount(null);
            });
    }, [id, agent, setAccount, setAsDisabled, setErrors])

    debugger

    if (!account) {
        return <>
            <div className='account-details'>
                <h1> Loading... </h1>
            </div>
        </>
    }

    return (
        <>
            {agent ? (
                account ? (
                    <div className='account-details'>
                        <h2>Account Details</h2>
                        <EditAccountForm id={id} />
                    </div>
                ) : (
                    <div className='account-details'>
                        {errors.length > 0 ? <h2>{errors[0]}</h2> : <h2>That account does not exist.</h2>}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    )
}

export default AccountById