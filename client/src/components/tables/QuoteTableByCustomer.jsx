import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

const QuoteTableByCustomer = () => {

    const { agent, quotes, handleIdClick, customer, newConfigurationHandleIdClick } = useContext(AgentContext);
    const { id } = useParams()

    const quotesByCustomer = customer.quotes

    return (
        <>
            <Container>
                <Row>
                    <Col md={4} sm={12}>
                        <h3>Quote Activity</h3>
                    </Col>
                    {
                        agent.role_id === 1
                            ? null
                            :
                            <Col className="d-flex justify-content-end gap-2">
                                <Button type="button" onClick={() => newConfigurationHandleIdClick(customer)}>Create New Quote</Button>
                            </Col>
                    }
                </Row>
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
                    {quotesByCustomer.map((quote) => (
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

export default QuoteTableByCustomer