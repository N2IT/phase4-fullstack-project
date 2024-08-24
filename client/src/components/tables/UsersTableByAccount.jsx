import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const UsersTableByAccount = () => {
    console.log('UsersTableByAccount')

    const { account, handleIdClick, agent, navigate, isLoading } = useContext(AgentContext);
    // const { id } = useParams()
    // debugger
    // console.log(account)

    // const accountUsers = account.users.filter(user => {
    //     // console.log(typeof user.account_id, typeof account.id);
    //     return account.id.toString() === id;
    // });
    const accountUsers = account.users

    // NEED TO LOOK INTO WHY MANAGER LOGIN IS FAILING WHEN HEADING TO MY ACCOUNT PAGE
    // LOGIN TO LIVE WITH INCOGNITO BROWSER TO TEST

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <Container>
                <div className="account-details">
                    <Row className='mb-3'>
                        <Col md={6} sm={12}>
                            <h3>Account Users</h3>
                        </Col>
                        <Col className="d-flex justify-content-end gap-2">
                            {agent.role_id === 3 ? null : <Button variant='primary' type="button" onClick={() => navigate(`accounts/${account.id}/add-user`)}>Add New User</Button>}
                        </Col>
                    </Row>
                </div>
            </Container>
                <Table responsive striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>USERNAME</th>
                            <th>FIRST NAME</th>
                            <th>LAST NAME</th>
                            <th>EMAIL</th>
                            {/* <th>STATUS</th> */}
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
                                {/* <td>{user.status}</td> */}
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