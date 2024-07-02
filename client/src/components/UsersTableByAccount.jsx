import { useContext } from 'react'
import { AgentContext } from '../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const UsersTableByAccount = () => {

    const { users, account, handleIdClick, agent, navigate } = useContext(AgentContext);

    const accountUsers = users.filter(user => {
        // console.log(typeof user.account_id, typeof account.id);
        return parseInt(user.account_id, 10) === account.id;
    });

    return (
        <>
            <Container>
                <div className="account-details">
                    <Row>
                        <Col md={6} sm={12}>
                            <h3>Account Users</h3>
                        </Col>
                        <Col md={6} sm={12}>
                            {agent.role_id === 3 ? null : <button type="button" onClick={() => navigate(`accounts/${account.id}/add-user`)}>Add New User</button>}
                        </Col>
                    </Row>
                </div>
            </Container>

            <Table responsive="sm" striped="columns">
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
                            <td>{user.status}</td>
                            {agent.role_id === 3 ? (agent.username === user.username ?
                                <td><p className="view-btn" title="View User" onClick={() => handleIdClick(user)}> View </p></td>
                                :
                                <td><p>n/a</p></td>) : (
                                <td><p className="view-btn" title="View User" onClick={() => handleIdClick(user)}> View </p></td>
                            )
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default UsersTableByAccount