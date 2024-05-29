import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import EditUserForm from './EditUserForm'
import { Link } from 'react-router-dom';

const UserById = () => {
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
    ] = useOutletContext()

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/users/${id}`)
                .then((r) => r.json())
                .then((data) => setUser(data))
                .catch(error => console.error('Errors:', error));
        }
    }, [])

    return (
        <>
            <div className='account-details'>
                <h2>User Details</h2>
                {user ? <p><EditUserForm id={id} /></p> :
                    <div>
                        <h2>Unauthorized</h2>
                        <Link to="/">Log in</Link>
                        <h3>Get Started Here:</h3>
                        <Link to="/sign-up">Sign Up</Link>
                    </div>}
            </div>
        </>
    )
}

export default UserById