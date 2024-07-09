import SignupPageUserForm from "../components/forms/SignupPageUserForm";
import SignupPageAccountForm from "../components/forms/SignupPageAccountForm";
import { useContext } from "react";
import { AgentContext } from '../AgentProvider';

const SignUp = () => {

  const { accountForm, onSubmitAccountForm } = useContext(AgentContext);
  
  return (
    <div>
      {/* <h2>Create New Account</h2> */}
      {accountForm ? <SignupPageAccountForm setAccountForm={onSubmitAccountForm}/> : <SignupPageUserForm /> }
    </div>
  );
  }

export default SignUp