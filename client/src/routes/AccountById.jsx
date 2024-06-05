import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgentContext } from '../AgentProvider';
import UsersTableByAccount from '../components/UsersTableByAccount';
import Unauthorized from '../components/Unauthorized';
import AdminEditAccountForm from '../components/AdminEditAccountForm';
import ManagerEditAccountForm from '../components/ManagerEditAccountForm';
import SalesEditAccountForm from '../components/SalesEditAccountForm';

const AccountById = () => {

    const { agent, account, isLoading, setAccount, setIsLoading, setUsers, setAsDisabled, setErrors, errors } = useContext(AgentContext);
    const { id } = useParams();

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/accounts/${id}`)
            .then(response => {
                // if (!response.ok) {
                //     return response.json().then(data => { throw data; });
                // }
                if (!response.ok) {
                    return response.json().then(data => console.log(data.errors))
                }
                return response.json();
            })
            .then(data => {
                setAccount(data);
                // setUsers(data.users) THIS IS BREAKING THINGS
                setAsDisabled(true);
                setErrors(null);
            })
            // .catch(error => {
            //     // console.log(errors)
            //     console.error('Errors:', error);
            //     setErrors(error);
            //     setAccount(null);
            // });

        // without this i lose userstablebyaccount data on page refresh
        // possible alternate route?
        fetch('/api/users')
            .then((r) => r.json())
            .then((data) => {
                if (data.errors) {
                    setErrors(data.errors);
                }
                else
                    setUsers(data)
                setErrors(null)
            })
            .then(() => setIsLoading(false))
            .catch(error => console.error('Error:', error));

    }, [id, agent, setAccount, setAsDisabled, setErrors])

    if (isLoading) {
        return <div> Loading ... </div>
    }

    if (agent.role_id === 1 && account) {
        return (
            <>
                <div className='account-details'>
                    <h2>Hello, admin:</h2>
                    <h3>Account Details</h3>
                    <AdminEditAccountForm id={id} />
                </div>
                <div>
                    <UsersTableByAccount />
                </div>
            </>
        )
    }

    if (agent.role_id === 2 && account) {
        return (
            <>
                <div className='account-details'>
                    <h2>Hello, manager:</h2>
                    <h3>Account Details</h3>
                    <ManagerEditAccountForm id={id} />
                </div>
                <div>
                    <UsersTableByAccount />
                </div>
            </>
        )
    }

    if (agent.role_id === 3 && account) {
        return (
            <>
                <div className='account-details'>
                    <h2>Hello, sales:</h2>
                    <h3>Account Details</h3>
                    <SalesEditAccountForm id={id} />
                </div>
                <div>
                    <UsersTableByAccount />
                </div>

            </>
        )
    }

    if (agent.role_id === null) {
        return (
            <div className = 'account-details'>
                <h2>Please contact your administrator to assign your role within the account.</h2>
            </div>
        )
    }

    return (
        <>
            <div className='account-details'>
                <h2>404: That account does not exist.</h2>
            </div>
        </>
    )
}

export default AccountById