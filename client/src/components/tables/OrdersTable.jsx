import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';

const OrdersTable = ({acctOrders = null}) => {

    const { orders, handleIdClick, isLoading, setOrders } = useContext(AgentContext);

    const accountId = localStorage.getItem('account.id');

 // if accountId set orders to acctOrders else keep orders as is
    if (accountId) {
        setOrders(acctOrders)
    }
    
    return (
        <>
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
                            <td>${order.sale_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td>{order.status}</td>
                            <td><p className="view-btn" title="View Order" onClick={() => handleIdClick(order)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default OrdersTable