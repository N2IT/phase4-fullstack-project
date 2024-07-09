import { useContext, useEffect } from 'react';
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useParams } from 'react-router-dom';

const CustomersTable = () => {

    const { handleIdClick, isLoading, customers, navigate, setCustomers, setNewCustomerForQuote, setErrors, setAsDisabled } = useContext(AgentContext);
    const { id } = useParams()

    useEffect(() => {
        fetch('/api/customers')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setCustomers(data);
                setAsDisabled(true);
                // setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setCustomers(null);
            });
    }, [id]);

    const customersByAccount = customers.filter(customer => {
        return customer.account_id.toString() === id;
    })

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