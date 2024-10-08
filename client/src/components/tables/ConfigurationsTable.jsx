import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';

const ConfigurationsTable = () => {

    const { configurations, handleIdClick, isLoading } = useContext(AgentContext);

    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive striped bordered hover size='sm'>
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
                        {configurations.map((configuration) => (
                            <tr key={configuration.id} className="">
                                <td>{configuration.quote.quote_number}</td>
                                <td>{configuration.project_name}</td>
                                <td>{configuration.unit_name}</td>
                                <td>${parseFloat(configuration.list_price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                <td>{configuration.complete_unit === true ? 'true' : 'false'}</td>
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