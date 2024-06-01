import { useContext, useEffect } from 'react'
import { AgentContext } from '../AgentProvider';

const UsersTableByAccount = ({ accountUsers }) => {

    const { handleUserIdClick } = useContext(AgentContext);

    if (!accountUsers) {
        return <>
            <div className='account-details'>
                <h1> Loading... </h1>
            </div>
        </>
    }

    return (
        <>
            <h3>Account Users</h3>
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
                            <td>{user.status === true ? <p>Active</p> : <p>Inactive</p>}</td>
                            <td><p className="view-btn" title="View User" onClick={() => handleUserIdClick(user)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default UsersTableByAccount