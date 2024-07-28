import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials'
import Unauthorized from '../components/Unauthorized';
import AdminView from '../components/AdminView';
import ManagerView from '../components/ManagerView';

const AccountById = () => {
    const { agent, account, isLoading, setIsLoading, setAccount, setAsDisabled, setErrors } = useContext(AgentContext);
    const { id } = useParams();

    

    useEffect(() => {
        setIsLoading(true)
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
                localStorage.setItem('account.id', JSON.stringify(data.id))
                localStorage.setItem('account.discount', JSON.stringify(data.discount))
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setAccount(null);
            });
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    if (agent.role_id === 1 && account) {
        return (
            <AdminView />
        );
    }

    if (agent.role_id !== 1 && agent.account_id.toString() === id) {
        return (
            <ManagerView />
        )
    }

    return (
        <>
            <InvalidCredentials />
        </>
    );
};

export default AccountById;
