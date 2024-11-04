import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

const NewQuoteCustomersTableByAccount = () => {

    const { newConfigurationHandleIdClick, isLoading, customers, account, navigate, setNewCustomerForQuote } = useContext(AgentContext);

    const customersByAccount = account.customers

    if (isLoading) {
        return <div> Loading ... </div>
    }

    return (
        <>
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th className='remove-column'>Email</th>
                        <th className='remove-column'>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customersByAccount.map((customer) => (
                        <tr key={customer.id} className="">
                            <td>{customer.id}</td>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td className='remove-column'>{customer.email}</td>
                            <td className='remove-column'>{customer.phone}</td>
                            <td><p className="view-btn" title="New Quote" onClick={() => newConfigurationHandleIdClick(customer)}> New Quote </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3>OR</h3>
            <p><Button variant='primary' onClick={() => (setNewCustomerForQuote(true), navigate(`accounts/${account.id}/add-customer`))}>Create New Customer</Button></p>
        </>
    )
}

export default NewQuoteCustomersTableByAccount