import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import SalesEditUserForm from '../components/SalesEditUserForm';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';

const UserById = () => {
    const { agent, user, setUser, setAsDisabled, errors = [], setErrors, isLoading } = useContext(AgentContext)
    const { id } = useParams();

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/users/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setUser(null);
            });
    }, [id, agent, setUser, setAsDisabled, setErrors]);

    if (isLoading) {
        return <div> Loading ... </div>
    }

    if (agent.role_id === 1 && user || agent.role_id === 2 && user) {
        return (
            <div className='account-details'>
                <h2>User Details</h2>
                <EditUserForm id={id} />
            </div>
        );
    }

    return (
        <>
            {agent ? (
                user ? (
                    <div className='account-details'>
                        <h2>User Details</h2>
                        <SalesEditUserForm id={id} />
                    </div>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That user does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );


}

export default UserById