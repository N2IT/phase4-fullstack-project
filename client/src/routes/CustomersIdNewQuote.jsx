import CreateNewQuoteForm from "../components/forms/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/forms/CreateNewConfiguration";
import Unauthorized from "../components/Unauthorized";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from "../components/InvalidCredentials";

const CustomersIdNewQuote = () => {

    const { agent, account, setAccount, setCustomer, setErrors, newQuotePageStatus, isLoading, setAsDisabled } = useContext(AgentContext);
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
                fetch(`/api/accounts/${data.account_id}`)
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
                        setErrors([error.errors] || ['Unknown Error']);
                        setAccount(null);
                    });
            })
        },[])

    // if (!account) {
    //     alert('Refreshing the form requires you start again.')
    //     history.go(-1)
    // }

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    // if (agent && !customer) {
    //     return (
    //         <InvalidCredentials />
    //     )
    // }

    if (agent.role_id === 1) {
        return (
            <div>
                {newQuotePageStatus ? <CreateNewQuoteForm account={account}/> : <CreateNewConfiguration account={account}/>}
            </div>
        );
    }

    if (agent.role_id !== 1 && agent.account_id.toString === id) {
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