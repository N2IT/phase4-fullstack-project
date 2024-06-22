import { useContext } from 'react';
import { AgentContext } from '../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const CustomersTable = () => {

    const { handleIdClick, isLoading, customers, account, navigate } = useContext(AgentContext);

    const customersByAccount = customers.filter(customer => {
        return parseInt(customer.account_id, 10) === account.id;
    })

    return (
        <>
            <Container>
                <Row>
                    <Col md={4} sm={12}>
                        <h3>Account Customers</h3>
                    </Col>
                    <Col md={4} sm={12}>
                        <button type="button" onClick={() => navigate('#')}>Add New Customer</button>
                    </Col>
                </Row>
            </Container>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive="sm" striped="columns">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>First Name</th>
                            {/* <th>Quote Title</th> */}
                            <th>Last Name</th>
                            {/* <th>Discount</th>
                            <th>M. Variable</th> */}
                            <th>Email</th>
                            {/* <th>Margin %</th>
                            <th>Margin $</th> */}
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersByAccount.map((customer) => (
                            <tr key={customer.id} className="">
                                <td>{customer.id}</td>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td><p className="view-btn" title="View Quote" onClick={() => handleIdClick(customer)}> View </p></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </>
    )
}

export default CustomersTable