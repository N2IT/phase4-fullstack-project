import CreateNewQuoteForm from "../components/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/CreateNewConfiguration";
import { useContext } from "react";
// import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';

const CustomersIdNewQuote = () => {

    const { agent, customer, account, setAccount, newQuotePageStatus, isLoading } = useContext(AgentContext);
    // const { id } = useParams();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    console.log(account)

    return (
        <div>
            {newQuotePageStatus ? <CreateNewQuoteForm account={account}/> : <CreateNewConfiguration />}
        </div>
    );
}

export default CustomersIdNewQuote