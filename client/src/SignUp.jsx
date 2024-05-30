import NewUserForm from "./NewUserForm";
import NewAccountForm from "./NewAccountForm";
import { useContext } from "react";
import { AgentContext, AgentProvider} from './AgentProvider';

const SignUp = () => {

  const { accountForm, setAccountForm, onSubmitAccountForm } = useContext(AgentContext);
  
  return (
    <div>
      {/* <h2>Create New Account</h2> */}
      {accountForm ? <NewAccountForm setAccountForm={onSubmitAccountForm}/> : <NewUserForm /> }
    </div>
  );
  }

export default SignUp