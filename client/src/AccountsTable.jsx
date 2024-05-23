// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import AccountById from "./AccountById"
import { Link } from "react-router-dom"

const AccountsTable = ({ accounts, setAccounts, loading }) => {

    // const handleClick = (acct) => {
    //     console.log(acct.id)
    // }
    // click the id
    // set the id to a variable using state
    // update url to accounts/variable
    // fetch account/var details for page view

    return (
        <>
            {loading ? <h2>Loading...</h2> :
                <table>
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
                                <td>{account.actions}</td>
                                <td><Link to={`/accounts/${account.id}`}>View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}

export default AccountsTable