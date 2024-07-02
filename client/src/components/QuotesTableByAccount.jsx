import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AgentContext } from '../AgentProvider';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const QuotesTableByAccount = () => {

    const { quotes, handleIdClick, account, navigate, setAccount, setCustomers, setErrors, setAsDisabled, setQuotes } = useContext(AgentContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/accounts/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setAccount(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setAccount(null);
            });
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
        fetch('/api/quotes')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setQuotes(data);
                setAsDisabled(true);
                // setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setQuotes(null);
            });
    }, []);

    const quotesByAccount = quotes.filter(quote => {
        //    console.log(configuration)
        //    console.log(quote)
        return parseInt(quote.account.id, 10) === account.id;
    });

    return (
        <>
            <Container>
                <Row>
                    <Col md={6} sm={12}>
                        <h3>Quote Activity</h3>
                    </Col>
                    <Col md={6} sm={12}>
                        <div>
                            <button type="button" onClick={() => navigate(`accounts/${account.id}/new-quote`)}>Create New Quote</button>
                        </div>
                    </Col>
                </Row>
            </Container>

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
                    {quotesByAccount.map((quote) => (
                        <tr key={quote.id} className="">
                            <td>{quote.quote_number}</td>
                            <td>{quote.title}</td>
                            <td>{quote.total_cost ? "$" + quote.total_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</td>
                            <td>{quote.sale_price ? "$" + quote.sale_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</td>
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

export default QuotesTableByAccount