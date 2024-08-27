import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import Table from 'react-bootstrap/Table';
import { Spinner } from 'react-bootstrap';

const AccountsTable = () => {

    const { accounts, handleIdClick, isLoading } = useContext(AgentContext);

    if (isLoading) {
        return <Spinner animation="border" />;
    }

    return (
        <>
            <Table responsive striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>ACCT NUMBER</th>
                        <th>COMPANY NAME</th>
                        <th>STATE</th>
                        <th>PHONE</th>
                        <th>DISCOUNT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.account_number} className="">
                            <td>{account.account_number}</td>
                            <td>{account.company_name}</td>
                            <td>{account.state}</td>
                            <td>{account.phone}</td>
                            <td>{account.discount}</td>
                            <td><p className="view-btn" title="View Account" onClick={() => handleIdClick(account)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default AccountsTable