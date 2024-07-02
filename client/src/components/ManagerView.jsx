import { useContext } from 'react';
import ManagerEditAccountForm from '../components/ManagerEditAccountForm';
import UsersTableByAccount from './UsersTableByAccount';
import QuotesTableByAccount from './QuotesTableByAccount';
import CustomersTableByAccount from './CustomersTableByAccount';
import { AgentContext } from '../AgentProvider';
import { useParams } from 'react-router-dom';


const ManagerView = () => {

    const { agent, account, show, handleClose, deleteAccountObject, setShow, handleShow } = useContext(AgentContext);
    const { id } = useParams()
    return (
        <>
            <div className='account-details'>
                <h2>Hello, {agent.username}:</h2>
                <h3>Account Details</h3>
                <ManagerEditAccountForm id={id} />
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