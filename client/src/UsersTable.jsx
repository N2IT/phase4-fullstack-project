import { useOutletContext } from "react-router-dom"

const UsersTable = () => {

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
    
    

    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FIRST NAME</th>
                            <th>LAST NAME</th>
                            <th>USERNAME</th>
                            <th>ACCOUNT NUMBER</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="">
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.username}</td>
                                {/* <td>{user.role_id}</td> */}
                                <td>{user.account_id}</td>
                                <td><p className="view-btn" title="View User" onClick={() => handleUserIdClick(user)}> View </p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default UsersTable