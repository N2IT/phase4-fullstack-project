import { useContext, useEffect } from 'react';
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


const CustomersTable = () => {
    const { handleIdClick, account, isLoading, customers, navigate, setCustomers, setNewCustomerForQuote, setErrors, setAsDisabled } = useContext(AgentContext);
    const { id } = useParams()

    const customersByAccount = account.customers.filter(customer => {
        return account.id.toString() === id;
    })

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <Container>
                <div className="account-details">
                    <Row className='mb-3'>
                        <Col md={6} sm={12}>
                            <h3>Account Customers</h3>
                        </Col>
                        <Col className="d-flex justify-content-end gap-2">
                            <Button variant='primary' type="button" onClick={() => (navigate(`accounts/${id}/add-customer`), setNewCustomerForQuote(false))}>Add New Customer</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th className='remove-column'>Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th className='remove-column'>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersByAccount.map((customer) => (
                            <tr key={customer.email} className="">
                                <td className='remove-column'>{customer.id}</td>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td className='remove-column'>{customer.email}</td>
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