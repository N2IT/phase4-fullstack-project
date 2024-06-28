import CreateNewQuoteForm from "../components/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/CreateNewConfiguration";
import { useContext } from "react";
import { AgentContext } from '../AgentProvider';

const CustomersIdNewQuote = () => {

  const { accountForm, onSubmitAccountForm } = useContext(AgentContext);
  
  return (
    <div>
      {/* <h2>Create New Account</h2> */}
      {accountForm ? <CreateNewQuoteForm setAccountForm={onSubmitAccountForm}/> : <CreateNewConfiguration /> }
    </div>
  );
  }

export default CustomersIdNewQuote