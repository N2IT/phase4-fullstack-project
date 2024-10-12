import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';

const ConfigurationsTable = ({ preview = null }) => {

    const { configurations, handleIdClick, isLoading, quote } = useContext(AgentContext);
    const quoteConfigurations = quote.screenconfigurations
    
    return (
        <>{!preview ?
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Quote Number</th>
                        <th className='remove-column'>Project Name</th>
                        <th>Unit Name</th>
                        <th>List Price</th>
                        <th className='remove-column'>Complete Unit</th>
                        {/* <th>Account Number</th> */}
                        {/* <th>Company Name</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {configurations.map((configuration) => (
                        <tr key={configuration.id} className="">
                            <td>{configuration.quote.quote_number}</td>
                            <td className='remove-column'>{configuration.project_name}</td>
                            <td>{configuration.unit_name}</td>
                            <td>${parseFloat(configuration.list_price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td className='remove-column'>{configuration.complete_unit === true ? 'true' : 'false'}</td>
                            <td><p className="view-btn" title="View Configuration" onClick={() => handleIdClick(configuration)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            :
            // create new Table with preview data that includes mapped configuration.project_name, configuration.unit_width and configuration.unit_height, and configuration sale price = (configuration.list_price * configuration.quote.discount) * configuration.quote.markup_variable
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Unit Dims (inches)</th>
                        <th>Frame</th>
                        <th>Fabric</th>
                        <th>Sale Price</th>
                    </tr>
                </thead>
                <tbody>
                    {quoteConfigurations.map((configuration) => (
                        <tr key={configuration.id}>
                            <td>{configuration.project_name}</td>
                            <td>{configuration.unit_width}w x {configuration.unit_height}h</td>
                            <td>{configuration.housing_tube_size}</td>
                            <td>{configuration.fabric_type}</td>
                            <td>${((configuration.list_price * quote.discount) * quote.markup_variable).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        }
        </>
    )
}

export default ConfigurationsTable