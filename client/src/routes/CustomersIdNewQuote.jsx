import CreateNewQuoteForm from "../components/forms/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/forms/CreateNewConfiguration";
import Unauthorized from "../components/Unauthorized";
import { useContext } from "react";
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from "../components/InvalidCredentials";

const CustomersIdNewQuote = () => {

    const { agent, account, customer, newQuotePageStatus, isLoading } = useContext(AgentContext);

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