import CreateNewQuoteForm from "../components/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/CreateNewConfiguration";
import { useContext } from "react";
import { AgentContext } from '../AgentProvider';

const CustomersIdNewQuote = () => {

    const { newQuotePageStatus } = useContext(AgentContext);

    // STRUGGLING TO MANAGE THE SATE OF ACCOUNTFORM MAY NEED TO BREAK OUT TO SEPARATE BETWEEN SIGNUP AND THIS PAGE

    return (
        <div>
            {/* <h2>Create New Account</h2> */}
            {newQuotePageStatus ? <CreateNewQuoteForm /> : <CreateNewConfiguration />}
        </div>
    );
}

export default CustomersIdNewQuote