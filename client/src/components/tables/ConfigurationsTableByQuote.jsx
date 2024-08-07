import { useContext } from 'react'
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ConfigurationsTableByQuote = () => {

    const { handleIdClick, navigate, quote, setNewQuotePageStatus } = useContext(AgentContext);

    const quoteConfigurations = quote.configurations

    return (
        <>
            <Container>
                <Row>
                    <Col md={6} sm={12}>
                        <h3>Quote Configurations</h3>
                    </Col>
                    <Col md={6} sm={12}>
                        <button type="button" onClick={() => (navigate(`customers/${quote.customer_id}/new-quote`), setNewQuotePageStatus(false))}>Add New Configuration</button>
                    </Col>
                </Row>
            </Container>
            {!quoteConfigurations ? <h1>Loading....</h1>
                :
                <Table responsive="sm" striped="columns">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Prod. Title</th>
                            <th>Sku</th>
                            <th>Prod. Description</th>
                            <th>Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {quoteConfigurations.map((configuration) => (
                            <tr key={configuration.id} className="">
                                <td>{configuration.id}</td>
                                <td>{configuration.product_title}</td>
                                <td>{configuration.sku}</td>
                                <td>{configuration.product_description}</td>
                                <td>${parseFloat(configuration.cost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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