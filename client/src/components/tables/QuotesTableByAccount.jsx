import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

const QuotesTableByAccount = () => {

    const { quotes, account, handleIdClick, navigate, isLoading, setErrors, setAsDisabled, setQuotes } = useContext(AgentContext);
    const { id } = useParams();

    const quotesByAccount = account.quotes



    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <Container>
                <div className="account-details">
                    <Row className='mb-3'>
                        <Col md={6} sm={12}>
                            <h3>Quote Activity</h3>
                        </Col>
                        <Col className="d-flex justify-content-end gap-2">
                            <div>
                                <Button variant='primary' type="button" onClick={() => navigate(`accounts/${id}/new-quote`)}>Create New Quote</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Quote Number</th>
                        <th>Quote Title</th>
                        <th>Total Cost</th>
                        <th className='remove-column'>Sale Price</th>
                        <th className='remove-column'>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quotesByAccount.map((quote) => (
                        <tr key={quote.id} className="">
                            <td>{quote.quote_number}</td>
                            <td>{quote.title}</td>
                            <td>{quote.total_cost ? "$" + quote.total_cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</td>
                            <td className='remove-column'>{quote.sale_price ? "$" + quote.sale_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</td>
                            {/* <td>${parseFloat(quote.sale_price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td> */}
                            <td className='remove-column'>{quote.status}</td>
                            <td><p className="view-btn" title="View Quote" onClick={() => handleIdClick(quote)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default QuotesTableByAccount