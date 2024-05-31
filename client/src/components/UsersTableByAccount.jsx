import { useContext, useEffect } from 'react'
import { AgentContext } from '../AgentProvider';

const UsersTableByAccount = () => {

    const { users, account, handleUserIdClick } = useContext(AgentContext);

    // RUNNING USEEFFECT ON ACCOUNTBYID PAGE PASSING DOWN VIA CONTEXT?
    // THEN FILTER THE USERS TO MATCH USER.ACCOUNT.ACCOUNT_NUMBER W/ ACCOUNT ID?


    // debugger

    const accountUsers = users.filter((user) => {
        if (user.account_id === account.id) {
            console.log(user)
        }
    })

    console.log(accountUsers)

    // LEAVING OFF HERE TO PICKUP LATER

    if (!users) {
        return <>
            <div className='account-details'>
                <h1> Loading... </h1>
            </div>
        </>
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>USERNAME</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>EMAIL</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {accountUsers.map((user) => (
                        <tr key={user.username} className="">
                            <td>{user.username}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            {/* <td>{user.role_id}</td> */}
                            <td>{user.status === true ? <p>Active</p> : <p>Inactive</p> }</td>
                            <td><p className="view-btn" title="View User" onClick={() => handleUserIdClick(user)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default UsersTableByAccount