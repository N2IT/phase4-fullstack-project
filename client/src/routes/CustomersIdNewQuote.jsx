import CreateNewQuoteForm from "../components/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/CreateNewConfiguration";
import { useContext } from "react";
import { AgentContext } from '../AgentProvider';

const CustomersIdNewQuote = () => {

    const { accountForm } = useContext(AgentContext);

    debugger
    console.log(accountForm)

    return (
        <div>
            {/* <h2>Create New Account</h2> */}
            {!accountForm ? <CreateNewQuoteForm /> : <CreateNewConfiguration />}
        </div>
    );
}

export default CustomersIdNewQuote