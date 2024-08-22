import { useContext } from 'react';
import { AgentContext } from '../../AgentProvider';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const AccountsTable = () => {

    const { accounts, handleIdClick, isLoading } = useContext(AgentContext);

    if (isLoading) {
        return <div> Loading ... </div>
      }

    return (
        <>
            {isLoading ? <h2>Loading...</h2> :
                <Table>
                    {/* <TableCaption>A list of all Accounts on file.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Acct Number</TableHead>
                            <TableHead>Company Name</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accounts.map((account) => (
                            <TableRow key={account.account_number} className="">
                                <TableCell>{account.account_number}</TableCell>
                                <TableCell>{account.company_name}</TableCell>
                                <TableCell>{account.state}</TableCell>
                                <TableCell>{account.phone}</TableCell>
                                <TableCell>{account.discount}</TableCell>
                                <TableCell><p className="view-btn" title="View Account" onClick={() => handleIdClick(account)}> View </p></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
        </>
    )
}

export default AccountsTable