import UserSignupForm from "../components/forms/UserSignupForm";
import AccountSignupForm from "../components/forms/AccountSignupForm";
import { useContext } from "react";
import { AgentContext } from '../AgentProvider';

const SignUp = () => {

  const { accountForm, onSubmitAccountForm } = useContext(AgentContext);
  
  return (
    <div>
      {/* <h2>Create New Account</h2> */}
      {accountForm ? <AccountSignupForm setAccountForm={onSubmitAccountForm}/> : <UserSignupForm /> }
    </div>
  );
  }

export default SignUp