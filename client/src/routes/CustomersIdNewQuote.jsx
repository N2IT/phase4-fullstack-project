import CreateNewQuoteForm from "../components/forms/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/forms/CreateNewConfiguration";
import Unauthorized from "../components/Unauthorized";
import { useContext, useEffect } from "react";
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from "../components/InvalidCredentials";
import { useParams } from "react-router-dom";

const CustomersIdNewQuote = () => {

    debugger

    const { agent, setCustomer, setAsDisabled, setErrors, customer, newQuotePageStatus, isLoading } = useContext(AgentContext);
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
                setErrors([error.errors] || ['Unknown Error']);
                setCustomer(null);
            });
    }, [])

    if (!customer) {
        return (
            <div>Loading...</div>
        )
    }

    else {

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
}

export default CustomersIdNewQuote