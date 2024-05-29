import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UsersTable from './UsersTable'

const Users = () => {

  const [
    user,
    setUser,
    accounts,
    setAccounts,
    accountForm,
    setAccountForm,
    onSubmitAccountForm,
    errors,
    setErrors,
    handleIdClick,
    valueId,
    setValueId,
    isLoading,
    setIsLoading,
    disabled,
    setAsDisabled,
    handleEditClick,
    handleUpdateAccount,
    handleUserIdClick,
    users,
    setUsers
  ] = useOutletContext();

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then((data) => setUsers(data))
      .then(() => setIsLoading(false))
      .catch(error => console.error('Error:', error));
  }, [])

  return (
    <>
      <div className="account-details">
        {user ?
          <div>
            <h2>Welcome to the Users page, {user.username}!</h2>
            <UsersTable />
          </div>
          :
          <div>
            <h2>Unauthorized</h2>
            <Link to="/">Log in</Link>
            <h3>Get Started Here:</h3>
            <Link to="/sign-up">Sign Up</Link>
          </div>
        }
      </div>
    </>
  );
}

export default Users;

