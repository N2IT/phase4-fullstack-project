import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';

const OrdersTable = () => {

    const { orders, handleIdClick, isLoading } = useContext(AgentContext);

    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Account Number</th>
                            <th>Order Date</th>
                            <th>Sale Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_number} className="">
                                <td>{order.order_number}</td>
                                <td>{order.account.company_name}</td>
                                <td>{order.created_at}</td>
                                <td>{order.sale_price}</td>
                                <td>{order.status}</td>
                                <td><p className="view-btn" title="View Order" onClick={() => handleIdClick(order)}> View </p></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </>
    )
}

export default OrdersTable