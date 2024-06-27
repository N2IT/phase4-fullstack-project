import { useContext } from 'react';
import { AgentContext } from '../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

const NewQuoteCustomersTableByAccount = () => {

    const { newConfigurationHandleIdClick, isLoading, customers, account } = useContext(AgentContext);

    const customersByAccount = customers.filter(customer => {
        return parseInt(customer.account_id, 10) === account.id;
    })

    return (
        <>
            <Container>
                <Row>
                    
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
                                <td><p className="view-btn" title="View Quote" onClick={() => newConfigurationHandleIdClick(customer)}> Select </p></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
            <h2>OR</h2>
            <p><button className='button' onClick={() => console.log('creatingnewcustomer')}>Create New Customer</button></p>
        </>
    )
}

export default NewQuoteCustomersTableByAccount