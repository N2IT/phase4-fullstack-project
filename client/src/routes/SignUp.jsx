import UserSignupForm from "../components/UserSignupForm";
import AccountSignupForm from "../components/AccountSignupForm";
import { useContext, useEffect } from "react";
import { AgentContext } from '../AgentProvider';

const SignUp = () => {

  const { accountForm, setAccountForm, onSubmitAccountForm } = useContext(AgentContext);

  useEffect(() => {
    setAccountForm(!accountForm)
  },[])
  
  return (
    <div>
      {/* <h2>Create New Account</h2> */}
      {accountForm ? <AccountSignupForm setAccountForm={onSubmitAccountForm}/> : <UserSignupForm /> }
    </div>
  );
  }

export default SignUp