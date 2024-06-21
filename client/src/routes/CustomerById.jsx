import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditCustomerForm from '../components/EditCustomerForm';
// import SalesEditUserForm from '../components/SalesEditUserForm';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';

const CustomerById = () => {
    const { agent, customer, setCustomer, setAsDisabled, errors = [], setErrors, isLoading } = useContext(AgentContext)
    const { id } = useParams();

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/customers/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setCustomer(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setCustomer(null);
            });
    }, [id, agent, setCustomer, setAsDisabled, setErrors]);

    if (isLoading) {
        return <div> Loading ... </div>
    }

    return (
        <>
            {agent ? (
                customer ? (
                    <>
                        <div className='account-details'>
                            <h2>Customer Details</h2>
                            <EditCustomerForm id={id} />
                        </div>
                    </>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That customer does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );


}

export default CustomerById