import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';

const CustomersTable = () => {

    const { handleIdClick, isLoading, customers } = useContext(AgentContext);
    
    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive striped hover>
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
                        {customers.map((customer) => (
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