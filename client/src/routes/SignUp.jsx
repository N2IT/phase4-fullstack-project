import NewUserForm from "../components/NewUserForm";
import NewAccountForm from "../components/NewAccountForm";
import { useContext } from "react";
import { AgentContext } from '../AgentProvider';

const SignUp = () => {

  const { accountForm, onSubmitAccountForm } = useContext(AgentContext);
  
  return (
    <div>
      {/* <h2>Create New Account</h2> */}
      {accountForm ? <NewAccountForm setAccountForm={onSubmitAccountForm}/> : <NewUserForm /> }
    </div>
  );
  }

export default SignUp