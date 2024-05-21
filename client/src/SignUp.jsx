import NewUserForm from "./NewUserForm";
import NewAccountForm from "./NewAccountForm";
import { useState } from "react";

const SignUp = () => {
    const[userForm, setUserForm] = useState(true)

    const onSubmitUserForm = () => {
        setUserForm(!userForm)
    }


    return (
      <div>
        {/* <h2>Create New Account</h2> */}
        {userForm ? <NewUserForm setUserForm={onSubmitUserForm}/> : <NewAccountForm />}
        {/* <NewUserForm />
        <NewAccountForm /> */}
      </div>
    );
  }

export default SignUp