import { useContext } from 'react'
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';

const UsersTable = () => {

    const { users, handleIdClick } = useContext(AgentContext);


    return (
        <>
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th className='remove-column'>USERNAME</th>
                        <th>ACCOUNT NUMBER</th>
                        <th className='remove-column'>STATUS</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="">
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td className='remove-column'>{user.username}</td>
                            {/* <td>{user.role_id}</td> */}
                            <td>{user.account.account_number}</td>
                            <td className='remove-column'>{user.status}</td>
                            <td><p className="view-btn" title="View User" onClick={() => handleIdClick(user)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default UsersTable