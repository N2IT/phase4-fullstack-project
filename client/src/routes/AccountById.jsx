import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgentContext } from '../AgentProvider';
import EditAccountForm from '../components/EditAccountForm'
import UsersTableByAccount from '../components/UsersTableByAccount';
// import UsersTable from '../components/UsersTable'
import Unauthorized from '../components/Unauthorized';
// import { Link } from 'react-router-dom';

const AccountById = () => {

    const { agent, account, setAccount, setIsLoading, setUsers, users, setAsDisabled, errors, setErrors } = useContext(AgentContext);
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
                // setUsers(data.users) THIS IS BREAKING THINGS
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setAccount(null);
            });

        fetch('/api/users')
            .then((r) => r.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                }
                else
                    setUsers(data)
            })
            .then(() => setIsLoading(false))
            .catch(error => console.error('Error:', error));

    }, [id, agent, setAccount, setAsDisabled, setErrors])

    if (!account) {
        return <>
            <div className='account-details'>
                <h1> Loading... </h1>
            </div>
        </>
    }

    if (!users) {
        return <>
            <div className='account-details'>
                <h1> Loading... </h1>
            </div>
        </>
    }

    const accountUsers = users.filter(user => {
        // console.log(typeof user.account_id, typeof account.id);
        // console.log('Comparing:', user.account_id, account.id);
        return parseInt(user.account_id, 10) === account.id;
    });
    
    console.log('Filtered Users:', accountUsers);


    return (
        <>
            {agent ? (
                account ? (
                    <>
                        <div className='account-details'>
                            <h2>Account Details</h2>
                            <EditAccountForm id={id} />
                        </div>
                        <div>
                            <UsersTableByAccount accountUsers={accountUsers}/>
                        </div>

                    </>
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