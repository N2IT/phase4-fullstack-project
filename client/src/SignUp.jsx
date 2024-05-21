import NewUserForm from "./NewUserForm";
import NewAccountForm from "./NewAccountForm";
import { useState } from "react";

const SignUp = () => {
    const[accountForm, setAccountForm] = useState(true)

    const onSubmitAccountForm = () => {
        setAccountForm(!accountForm)
    }

    return (
      <div>
        {/* <h2>Create New Account</h2> */}
        {accountForm ? <NewAccountForm setAccountForm={onSubmitAccountForm}/> : <NewUserForm /> }
      </div>
    );
  }

export default SignUp