import CreateNewQuoteForm from "../components/forms/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/forms/CreateNewConfiguration";
import Unauthorized from "../components/Unauthorized";
import { useContext, useEffect } from "react";
import { AgentContext } from '../AgentProvider';
import { useParams } from "react-router-dom";
import InvalidCredentials from "../components/InvalidCredentials";

const CustomersIdNewQuote = () => {

    const { agent, account, setCustomer, customer, newQuotePageStatus, isLoading, setAsDisabled, setErrors } = useContext(AgentContext);
    const { id } = useParams()
    
    useEffect(() => {
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
    },[id])

    if (!account) {
        alert('Refreshing the form requires you start again.')
        history.go(-1)
    }

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    if (agent.role_id === 1) {
        return (
            <div>
                {newQuotePageStatus ? <CreateNewQuoteForm /> : <CreateNewConfiguration />}
            </div>
        );
    }

    if (agent.role_id !== 1 && agent.account_id === customer.account_id) {
        return (
            <div>
                {newQuotePageStatus ? <CreateNewQuoteForm /> : <CreateNewConfiguration />}
            </div>
        );
    }

    return (
        <div>
            <InvalidCredentials />
        </div>
    );
}

export default CustomersIdNewQuote