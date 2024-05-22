import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AccountsTable = ({ accounts, setAccounts }) => {

    const handleClick = (id) => {
        useEffect('/api/account/<int:id>')
        .then((res) => res.json())
        .then((acct) => console.log(acct))

    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
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
                        <tr key={account.id} className="">
                            <td>{account.id}</td>
                            <td>{account.account_number}</td>
                            <td>{account.company_name}</td>
                            <td>{account.state}</td>
                            <td>{account.phone}</td>
                            <td>{account.discount}</td>
                            <td>{account.actions}</td>
                            <td><p className="view-btn" title="View Account" onClick={() => console.log(account)}> View </p></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AccountsTable