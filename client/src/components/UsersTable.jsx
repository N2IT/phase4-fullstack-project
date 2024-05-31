import { useContext } from 'react'
import { AgentContext } from '../AgentProvider';

const UsersTable = () => {

    const { users, handleUserIdClick } = useContext(AgentContext);


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>USERNAME</th>
                        <th>ACCOUNT NUMBER</th>
                        <th>STATUS</th>
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
                            <td>{user.account.account_number}</td>
                            <td>{user.status === true ? <p>Active</p> : <p>Inactive</p> }</td>
                            <td><p className="view-btn" title="View User" onClick={() => handleUserIdClick(user)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default UsersTable