import { useContext } from 'react'
import { AgentContext } from '../AgentProvider';
import Table from 'react-bootstrap/Table';

const QuoteTableByCustomer = () => {

    const { quotes, handleIdClick, customer } = useContext(AgentContext);

    const quotesByCustomer = quotes.filter(quote => {
    //    console.log(configuration)
    //    console.log(quote)
        return parseInt(quote.customer_id, 10) === customer.id;
    });

    return (
        <>
            <h3>Customer Quotes</h3>
            <Table responsive="sm" striped="columns">
                <thead>
                    <tr>
                        <th>Quote Number</th>
                        <th>Quote Title</th>
                        <th>Total Cost</th>
                        <th>Sale Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quotesByCustomer.map((quote) => (
                        <tr key={quote.id} className="">
                            <td>{quote.quote_number}</td>
                            <td>{quote.title}</td>
                            <td>{quote.total_cost ? "$" + quote.total_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</td>
                            <td>{quote.sale_price ? "$" + quote.sale_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "" }</td>
                            {/* <td>${parseFloat(quote.sale_price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td> */}
                            <td>{quote.status}</td>
                            <td><p className="view-btn" title="View Quote" onClick={() => handleIdClick(quote)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default QuoteTableByCustomer