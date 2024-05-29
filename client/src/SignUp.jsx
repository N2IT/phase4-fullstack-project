import NewUserForm from "./NewUserForm";
import NewAccountForm from "./NewAccountForm";
// import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const SignUp = () => {

    const [user, setUser, accounts, setAccounts, accountForm, setAccountForm, onSubmitAccountForm] = useOutletContext()
    
    return (
      <div>
        {/* <h2>Create New Account</h2> */}
        {accountForm ? <NewAccountForm setAccountForm={onSubmitAccountForm}/> : <NewUserForm /> }
      </div>
    );
  }

export default SignUp