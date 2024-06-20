import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgentContext } from '../AgentProvider';
import Unauthorized from '../components/Unauthorized';
import EditConfigurationForm from '../components/EditConfigurationForm';

const AccountById = () => {
    const { agent, isLoading, configuration, setConfiguration, setAsDisabled, setErrors, errors } = useContext(AgentContext);
    const { id } = useParams();

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/configurations/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setConfiguration(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setAccount(null);
            });
    }, [id, agent, setConfiguration, setAsDisabled, setErrors]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (agent.role_id === null && configuration) {
        return (
            <div className='account-details'>
                <h2>Please contact your administrator to assign your role within the account.</h2>
            </div>
        );
    }

    return (
        <>
            {agent.role_id ? (
                configuration ? (
                    <div className='account-details'>
                        <h2>Hello, admin:</h2>
                        <h2>Configuration Details</h2>
                        <EditConfigurationForm id={id} />
                    </div>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That configuration does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );
};

export default AccountById;
