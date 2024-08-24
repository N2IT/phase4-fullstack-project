import { useContext } from 'react';
import EditAccountFormGeneral from './forms/EditAccountFormGeneral';
import UsersTableByAccount from './tables/UsersTableByAccount';
import QuotesTableByAccount from './tables/QuotesTableByAccount';
import CustomersTableByAccount from './tables/CustomersTableByAccount';
import { AgentContext } from '../AgentProvider';
import { useParams } from 'react-router-dom';
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Link } from 'react-router-dom';


const ManagerView = ({ account }) => {

    console.log(account)

    const { agent, user } = useContext(AgentContext);
    const { id } = useParams()
    const pastCustomers = () => {
        console.log('created', account.customers.created_at)
        console.log('typeof', typeof (account.customers.created_at))
    }

    pastCustomers()

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