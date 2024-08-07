import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';

const CustomersTable = () => {
    const { handleIdClick, account, isLoading, navigate, setNewCustomerForQuote } = useContext(AgentContext);
    const { id } = useParams()

    const customersByAccount = account.customers

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <Container>
                <div className="account-details">
                    <Row>
                        <Col md={6} sm={12}>
                            <h3>Account Customers</h3>
                        </Col>
                        <Col md={6} sm={12}>
                            <button type="button" onClick={() => (navigate(`accounts/${id}/add-customer`), setNewCustomerForQuote(false))}>Add New Customer</button>
                        </Col>
                    </Row>
                </div>
            </Container>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive="sm" striped="columns">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersByAccount.map((customer) => (
                            <tr key={customer.email} className="">
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