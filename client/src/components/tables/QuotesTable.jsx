import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';

const QuotesTable = () => {

    const { handleIdClick, isLoading, quotes } = useContext(AgentContext);
    
    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive="sm" striped="columns">
                    <thead>
                        <tr>
                            <th>Quote Number</th>
                            {/* <th>Dealer</th> */}
                            <th>Quote Title</th>
                            <th>Total Cost</th>
                            {/* <th>Discount</th>
                            <th>M. Variable</th> */}
                            <th>Sale Price</th>
                            {/* <th>Margin %</th>
                            <th>Margin $</th> */}
                            {/* <th>Notes</th> */}
                            <th>Status</th>
                            {/* <th>Converted</th> */}
                            {/* <th>Created By</th> */}
                            <th>Created At</th>
                            {/* <th>Customer</th> */}
                            {/* <th>Sales Order Number</th> */}
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.map((quote) => (
                            <tr key={quote.id} className="">
                                <td>{quote.quote_number}</td>
                                <td>{quote.title}</td>
                                {/* <td>{quote.quote_number}</td> */}
                                <td>{quote.total_cost ? "$" + (parseFloat(quote.total_cost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : null}</td>
                                {/* <td>{quote.discount}</td>
                                <td>{quote.markup_variable}</td> */}
                                <td>{quote.sale_price ? "$" + (parseFloat(quote.sale_price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")): null }</td>
                                {/* <td>{quote.margin_percentage}</td>
                                <td>{quote.margin_dollars}</td> */}
                                {/* <td>{quote.notes}</td> */}
                                <td>{quote.status}</td>
                                {/* <td>{quote.created_by}</td> */}
                                <td>{quote.created_at}</td>
                                {/* <td>{quote.customer.first_name}&nbsp;{quote.customer.last_name}</td> */}
                                <td><p className="view-btn" title="View Quote" onClick={() => handleIdClick(quote)}> View </p></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </>
    )
}

export default QuotesTable