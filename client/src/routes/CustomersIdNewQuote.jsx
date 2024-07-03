import CreateNewQuoteForm from "../components/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/CreateNewConfiguration";
import Unauthorized from "../components/Unauthorized";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from "../components/InvalidCredentials";

const CustomersIdNewQuote = () => {

    const { agent, account, customer, newQuotePageStatus, isLoading } = useContext(AgentContext);

    if (newQuotePageStatus === false && !account) {
        alert('You have refreshed the page. Your quote has been created. Please review your quotes as you may have already initiated a new quote and should start your configuration there.')
        history.go(-1)
    }

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

    if (agent && !customer) {
        return (
            <InvalidCredentials />
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