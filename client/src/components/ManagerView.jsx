import ManagerEditAccountForm from '../components/ManagerEditAccountForm';
import UsersTableByAccount from './UsersTableByAccount';
import QuotesTableByAccount from './QuotesTableByAccount';
import CustomersTableByAccount from './CustomersTableByAccount';


const ManagerView = ({ id }) => {

    return (
        <>
            <div className='account-details'>
                <h2>Hello, {id}:</h2>
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