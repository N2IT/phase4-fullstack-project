import { useContext } from 'react'
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

const ConfigurationsTableByQuote = () => {

    const { handleIdClick, navigate, quote, setNewQuotePageStatus } = useContext(AgentContext);

    const quoteConfigurations = quote.screenconfigurations

    return (
        <>
            <Container>
                <Row className='mb-3'>
                    <Col md={6} sm={12}>
                        <h3>Quote Configurations</h3>
                    </Col>
                    <Col className="d-flex justify-content-end gap-2">
                        <Button variant='primary' type="button" onClick={() => (navigate(`customers/${quote.customer_id}/new-quote`), setNewQuotePageStatus(false))}>Add New Configuration</Button>
                    </Col>
                </Row>
            </Container>
            {!quoteConfigurations ? <h1>Loading....</h1>
                :
                <Table responsive="sm" striped="columns">
                    <thead>
                        <tr>
                            <th>Quote Number</th>
                            <th>Project Name</th>
                            <th>Unit Name</th>
                            <th>List Price</th>
                            <th>Complete Unit</th>
                            {/* <th>Account Number</th> */}
                            {/* <th>Company Name</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quoteConfigurations.map((configuration) => (
                            <tr key={configuration.id} className="">
                                <td>{configuration.quote.quote_number}</td>
                                <td>{configuration.project_name}</td>
                                <td>{configuration.unit_name}</td>
                                <td>${parseFloat(configuration.list_price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{configuration.complete_unit === 0 ? 'true' : 'false'}</td>
                                {/* <td>{configuration.quote.account.account_number}</td> */}
                                {/* <td>{configuration.quote.account.company_name}</td> */}
                                <td><p className="view-btn" title="View Configuration" onClick={() => handleIdClick(configuration)}> View </p></td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            }
        </>
    )
}

export default ConfigurationsTableByQuote