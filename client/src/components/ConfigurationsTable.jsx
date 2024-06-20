import { useContext } from 'react';
import { AgentContext } from '../AgentProvider';
import Table from 'react-bootstrap/Table';

const ConfigurationsTable = () => {

    const { configurations, handleIdClick, isLoading } = useContext(AgentContext);

    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive="sm" striped="columns">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Sku</th>
                            <th>Description</th>
                            <th>Cost</th>
                            <th>Quote Number</th>
                            {/* <th>Account Number</th> */}
                            <th>Company Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {configurations.map((configuration) => (
                            <tr key={configuration.id} className="">
                                <td>{configuration.id}</td>
                                <td>{configuration.sku}</td>
                                <td>{configuration.product_description}</td>
                                <td>${parseFloat(configuration.cost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{configuration.quote.quote_number}</td>
                                {/* <td>{configuration.quote.account.account_number}</td> */}
                                <td>{configuration.quote.account.company_name}</td>
                                <td><p className="view-btn" title="View Configuration" onClick={() => handleIdClick(configuration)}> View </p></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </>
    )
}

export default ConfigurationsTable