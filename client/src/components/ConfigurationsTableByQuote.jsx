import { useContext } from 'react'
import { AgentContext } from '../AgentProvider';
import Table from 'react-bootstrap/Table';

const ConfigurationsTableByQuote = () => {

    const { configurations, quote, handleIdClick } = useContext(AgentContext);

    const quoteConfigurations = configurations.filter(configuration => {
        return parseInt(configuration.quote_id, 10) === quote.id;
    });

    return (
        <>
            <h3>Quote Configurations</h3>
            <Table responsive="sm" striped="columns">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Dealer</th>
                        <th>Sku</th>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quoteConfigurations.map((configuration) => (
                        <tr key={configuration.id} className="">
                            <td>{configuration.id}</td>
                            <td>{configuration.quote.account.company_name}</td>
                            <td>{configuration.sku}</td>
                            <td>{configuration.product_description}</td>
                            <td>${parseFloat(configuration.cost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td><p className="view-btn" title="View Configuration" onClick={() => handleIdClick(configuration)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default ConfigurationsTableByQuote