import { useContext } from 'react';
import EditAccountFormGeneral from './forms/EditAccountFormGeneral';
import UsersTableByAccount from './tables/UsersTableByAccount';
import QuotesTableByAccount from './tables/QuotesTableByAccount';
import CustomersTableByAccount from './tables/CustomersTableByAccount';
import { AgentContext } from '../AgentProvider';
import { useParams } from 'react-router-dom';


const ManagerView = () => {

    const { agent, user } = useContext(AgentContext);
    const { id } = useParams()
    return (
        <>
            <div className='account-details'>
                <h2>Hello, {agent.username}:</h2>
                <h3>Account Details</h3>
                <EditAccountFormGeneral id={id} />
            </div>
            <div>
                <UsersTableByAccount />
            </div>
            <div>
                <QuotesTableByAccount />
            </div>
            <div>
                <CustomersTableByAccount />
            </div>
        </>
    )

}

export default ManagerView