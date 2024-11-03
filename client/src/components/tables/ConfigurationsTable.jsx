import React, { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';

const ConfigurationsTable = ({ preview = null }) => {
    const { configurations, handleIdClick, isLoading, quote, order } = useContext(AgentContext);
    
    const quoteConfigurations = quote?.screenconfigurations || [];
    const orderConfigurations = order?.screenconfigurations || [];
    const configurationsToRender = quoteConfigurations.length > 0 ? quoteConfigurations : orderConfigurations;
    const discount = quote?.discount ?? order?.quote?.discount ?? 0;
    const markup = quote?.markup_variable ?? order?.quote?.markup_variable ?? 0;

    console.log('order', order)
    console.log('quote', quote)
    console.log('discount', discount)
    console.log('markup', markup)
    console.log('preiview', preview)
    // debugger;
    

    return (
        <>{!preview ?
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Quote Number</th>
                        <th className='remove-column'>Project Name</th>
                        <th>Unit Dims</th>
                        <th>Housing Tube Size</th>
                        <th>List Price</th>
                        <th className='remove-column'>Complete Unit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {configurations.map((configuration) => (
                        <tr key={configuration.id}>
                            <td>{configuration.quote.quote_number}</td>
                            <td>{configuration.project_name}</td>
                            <td>{configuration.unit_width}w x {configuration.unit_height}h</td>
                            <td>{configuration.housing_tube_size}</td>
                            <td>${configuration.list_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td><td className='remove-column'>{configuration.complete_unit === true ? 'true' : 'false'}</td></td>
                            <td><p className="view-btn" title="View Configuration" onClick={() => handleIdClick(configuration)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            :
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Unit Dims (inches)</th>
                        <th>Housing Tube Size</th>
                        <th>Fabric Type</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {configurationsToRender.map((configuration) => (
                        <tr key={configuration.id}>
                            <td>{configuration.project_name}</td>
                            <td>{configuration.unit_width}w x {configuration.unit_height}h</td>
                            <td>{configuration.housing_tube_size}</td>
                            <td>{configuration.fabric_type}</td>
                            <td>${((configuration.list_price - (configuration.list_price * discount)) * markup).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        }
        </>
    );
};

export default ConfigurationsTable;