import { useContext } from 'react';
import { AgentContext } from '../AgentProvider';

const QuotesTable = () => {

    const { quotes, handleIdClick, isLoading } = useContext(AgentContext);

    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <table>
                    <thead>
                        <tr>
                            <th>Quote Number</th>
                            <th>Dealer</th>
                            {/* <th>Quote Title</th> */}
                            <th>Total Cost</th>
                            {/* <th>Discount</th>
                            <th>M. Variable</th> */}
                            <th>Sale Price</th>
                            {/* <th>Margin %</th>
                            <th>Margin $</th> */}
                            <th>Notes</th>
                            <th>Status</th>
                            {/* <th>Converted</th> */}
                            <th>Created By</th>
                            <th>Created At</th>
                            {/* <th>Customer</th> */}
                            {/* <th>Sales Order Number</th> */}
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.map((quote) => (
                            <tr key={quote.quote_number} className="">
                                <td>{quote.quote_number}</td>
                                <td>{quote.account.company_name}</td>
                                <td>{quote.quote_number}</td>
                                <td>{quote.total_cost}</td>
                                {/* <td>{quote.discount}</td>
                                <td>{quote.markup_variable}</td> */}
                                <td>{quote.sale_price}</td>
                                {/* <td>{quote.margin_percentage}</td>
                                <td>{quote.margin_dollars}</td> */}
                                <td>{quote.notes}</td>
                                <td>{quote.status}</td>
                                <td>{quote.created_by}</td>
                                <td>{quote.created_at}</td>
                                {/* <td>{quote.customer.first_name}&nbsp;{quote.customer.last_name}</td> */}
                                <td><p className="view-btn" title="View Quote" onClick={() => handleIdClick(quote)}> View </p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default QuotesTable