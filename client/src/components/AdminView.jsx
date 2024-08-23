import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UsersTableByAccount from './tables/UsersTableByAccount';
import EditAccountFormAdmin from './forms/EditAccountFormAdmin';
import QuotesTableByAccount from './tables/QuotesTableByAccount';
import CustomersTableByAccount from './tables/CustomersTableByAccount';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../AgentProvider';
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Link } from 'react-router-dom';

const AdminView = () => {

    const { agent, user, account, show, handleClose, deleteAccountObject, setShow, handleShow } = useContext(AgentContext);
    const { id } = useParams();

    const handleDeleteClick = () => {
        fetch(`/api/accounts/${id}`, {
            method: 'DELETE',
        });
        deleteAccountObject(id, account)
        setShow(false)
    }

    const customerChartComp = () => {
        let older = []
        let pastSevenDays = []
        const acctCus = account.customers
        acctCus.forEach((customer) => {
            const currentDate = new Date();
            let createDate = new Date(customer.created_at)
            const timeDifference = currentDate - createDate;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
            if (daysDifference > 7 && daysDifference <= 14) {
                older.push(customer)
            }
            if (daysDifference <= 7) {
                pastSevenDays.push(customer)
            }
        })
        if (older.length === 0) {
            return 'No customers from the previous week to compare.';
        }
        let calculated = (pastSevenDays.length - older.length) / older.length;
        return '+' + calculated.toFixed(2) + '%' + 'from last week';
    };

    const quoteChartComp = () => {

        let older = []
        let pastSevenDays = []
        const acctQuotes = account.quotes
        acctQuotes.forEach((quote) => {
            const currentDate = new Date();
            let createDate = new Date(quote.created_at)
            const timeDifference = currentDate - createDate;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
            if (daysDifference > 7 && daysDifference <= 14) {
                older.push(quote)
            }
            if (daysDifference <= 7) {
                pastSevenDays.push(quote)
            }
        })
        if (older.length === 0) {
            return 'No quotes from the previous week to compare.';
        }
        let calculated = (pastSevenDays.length - older.length) / older.length;
        return '+' + calculated.toFixed(2) + '%' + 'from last week';
    };

    const openQuoteComp = () => {
        const openQuote = []
        const acctQuotes = account.quotes
        acctQuotes.forEach((quote) => {
            if (quote.converted === 'No'){
                openQuote.push(quote)
            }
        })
        let calculated = openQuote.length
        debugger
        return calculated
    }

    const quoteDollarsChartComp = (value = null) => {
        let older = [];
        let pastSevenDays = [];
        let allTime = []
        const acctQuotes = account.quotes;
        acctQuotes.forEach((quote) => {
            const currentDate = new Date();
            let createDate = new Date(quote.created_at);
            const timeDifference = currentDate - createDate;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    
            if (daysDifference > 7 && daysDifference <= 14) {
                older.push(quote.sale_price);
            }
            if (daysDifference <= 7) {
                pastSevenDays.push(quote.sale_price);
            }
            if (value === 'get total') {
                allTime.push(quote.sale_price)
            }
        });

        const totalOlder = older.reduce((acc, curr) => acc + curr, 0);
        const totalPastSevenDays = pastSevenDays.reduce((acc, curr) => acc + curr, 0);
        const totalAllTime = allTime.reduce((acc, curr) => acc + curr, 0);

        if (value === 'get total') {
            debugger
            return parseFloat(totalAllTime)
        }
        if (totalOlder === 0) {
            return 'No quote dollars from the previous week to compare.';
        }

        let percentageChange = ((totalPastSevenDays - totalOlder) / totalOlder) * 100;
        return `Percentage change from last week: ${percentageChange.toFixed(2)}%`;
    };

    return (
        <>
            <div className="flex min-h-screen w-full flex-col account-details">
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        <Card x-chunk="dashboard-01-chunk-0">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Customers
                                </CardTitle>
                                {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{(account.customers).length}</div>
                                <p className="mt-3 text-xs text-muted-foreground">{customerChartComp()}</p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-1">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Quotes
                                </CardTitle>
                                {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{(account.quotes).length}</div>
                                <p className="mt-3 text-xs text-muted-foreground">{quoteChartComp()}</p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-2">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Open Quote $</CardTitle>
                                {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{quoteDollarsChartComp('get total').toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                <p className="mt-3 text-xs text-muted-foreground">{quoteDollarsChartComp()}</p>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-3">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Open Quotes</CardTitle>
                                {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{openQuoteComp()}</div>
                                <p className="mt-3 text-xs text-muted-foreground">
                                    Avg open quote value of {(quoteDollarsChartComp('get total') / openQuoteComp()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <Card
                            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                        >
                            <CardHeader className="flex flex-row items-center">
                                <div className="grid gap-2">
                                    <CardTitle>Transactions</CardTitle>
                                    <CardDescription>
                                        Recent transactions from your store.
                                    </CardDescription>
                                </div>
                                <Button asChild size="sm" className="ml-auto gap-1">
                                    <Link href="#">
                                        View All
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="hidden xl:table-column">
                                                Type
                                            </TableHead>
                                            <TableHead className="hidden xl:table-column">
                                                Status
                                            </TableHead>
                                            <TableHead className="hidden xl:table-column">
                                                Date
                                            </TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Liam Johnson</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    liam@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                <Badge className="text-xs" variant="outline">
                                                    Approved
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                                2023-06-23
                                            </TableCell>
                                            <TableCell className="text-right">$250.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Olivia Smith</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    olivia@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                Refund
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                <Badge className="text-xs" variant="outline">
                                                    Declined
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                                2023-06-24
                                            </TableCell>
                                            <TableCell className="text-right">$150.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Noah Williams</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    noah@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                Subscription
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                <Badge className="text-xs" variant="outline">
                                                    Approved
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                                2023-06-25
                                            </TableCell>
                                            <TableCell className="text-right">$350.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Emma Brown</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    emma@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                <Badge className="text-xs" variant="outline">
                                                    Approved
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                                2023-06-26
                                            </TableCell>
                                            <TableCell className="text-right">$450.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Liam Johnson</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    liam@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden xl:table-column">
                                                <Badge className="text-xs" variant="outline">
                                                    Approved
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                                                2023-06-27
                                            </TableCell>
                                            <TableCell className="text-right">$550.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-01-chunk-5">
                            <CardHeader>
                                <CardTitle>Recent Sales</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-8">
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                        <AvatarFallback>OM</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Olivia Martin
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            olivia.martin@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$1,999.00</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                        <AvatarFallback>JL</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Jackson Lee
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            jackson.lee@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$39.00</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                        <AvatarFallback>IN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Isabella Nguyen
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            isabella.nguyen@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$299.00</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                        <AvatarFallback>WK</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            William Kim
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            will@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$99.00</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Avatar className="hidden h-9 w-9 sm:flex">
                                        <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                        <AvatarFallback>SD</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <p className="text-sm font-medium leading-none">
                                            Sofia Davis
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            sofia.davis@email.com
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">+$39.00</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )

    // return (
    //     <>
    //         <div className="flex min-h-screen w-full flex-col mt-5">
    //             <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    //                 <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    // <Card x-chunk="dashboard-01-chunk-0">
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium">
    //             Customers
    //         </CardTitle>
    //         {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
    //     </CardHeader>
    //     <CardContent>
    //         <div className="text-2xl font-bold">{(account.customers).length}</div>
    //         <p className="mt-3 text-xs text-muted-foreground">{customerChartComp()}</p>
    //     </CardContent>
    // </Card>
    //  <Card x-chunk="dashboard-01-chunk-1">
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium">
    //             Quotes
    //         </CardTitle>
    //         {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
    //     </CardHeader>
    //     <CardContent>
    //         <div className="text-2xl font-bold">{(account.quotes).length}</div>
    //         <p className="mt-3 text-xs text-muted-foreground">{quoteChartComp()}</p>
    //     </CardContent>
    // </Card>
    // <Card x-chunk="dashboard-01-chunk-2">
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium">Open Quote $</CardTitle>
    //         {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
    //     </CardHeader>
    //     <CardContent>
    //         <div className="text-2xl font-bold">{quoteDollarsChartComp('get total')}</div>
    //         <p className="mt-3 text-xs text-muted-foreground">{quoteDollarsChartComp()}</p>
    //     </CardContent>
    // </Card>
    // {/*<Card x-chunk="dashboard-01-chunk-3">
    //     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //         <CardTitle className="text-sm font-medium">Active Now</CardTitle>
    //         <Activity className="h-4 w-4 text-muted-foreground" />
    //     </CardHeader>
    //     <CardContent>
    //         <div className="text-2xl font-bold">+573</div>
    //         <p className="text-xs text-muted-foreground">
    //             +201 since last hour
    //         </p>
    //     </CardContent>
    // </Card> */}
    //                 </div>
    //                 <CustomersTableByAccount />
    //                 <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
    //                     <Card
    //                         className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
    //                     >
    //                         <CardHeader className="flex flex-row items-center">
    //                             <div className="grid gap-2">
    //                                 <CardTitle>Transactions</CardTitle>
    //                                 <CardDescription>
    //                                     Recent transactions from your store.
    //                                 </CardDescription>
    //                             </div>
    //                             <Button asChild size="sm" className="ml-auto gap-1">
    //                                 <Link href="#">
    //                                     View All
    //                                     <ArrowUpRight className="h-4 w-4" />
    //                                 </Link>
    //                             </Button>
    //                         </CardHeader>
    //                         <CardContent>
    //                             <Table>
    //                                 <TableHeader>
    //                                     <TableRow>
    //                                         <TableHead>Customer</TableHead>
    //                                         <TableHead className="hidden xl:table-column">
    //                                             Type
    //                                         </TableHead>
    //                                         <TableHead className="hidden xl:table-column">
    //                                             Status
    //                                         </TableHead>
    //                                         <TableHead className="hidden xl:table-column">
    //                                             Date
    //                                         </TableHead>
    //                                         <TableHead className="text-right">Amount</TableHead>
    //                                     </TableRow>
    //                                 </TableHeader>
    //                                 <TableBody>
    //                                     <TableRow>
    //                                         <TableCell>
    //                                             <div className="font-medium">Liam Johnson</div>
    //                                             <div className="hidden text-sm text-muted-foreground md:inline">
    //                                                 liam@example.com
    //                                             </div>
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             Sale
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             <Badge className="text-xs" variant="outline">
    //                                                 Approved
    //                                             </Badge>
    //                                         </TableCell>
    //                                         <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
    //                                             2023-06-23
    //                                         </TableCell>
    //                                         <TableCell className="text-right">$250.00</TableCell>
    //                                     </TableRow>
    //                                     <TableRow>
    //                                         <TableCell>
    //                                             <div className="font-medium">Olivia Smith</div>
    //                                             <div className="hidden text-sm text-muted-foreground md:inline">
    //                                                 olivia@example.com
    //                                             </div>
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             Refund
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             <Badge className="text-xs" variant="outline">
    //                                                 Declined
    //                                             </Badge>
    //                                         </TableCell>
    //                                         <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
    //                                             2023-06-24
    //                                         </TableCell>
    //                                         <TableCell className="text-right">$150.00</TableCell>
    //                                     </TableRow>
    //                                     <TableRow>
    //                                         <TableCell>
    //                                             <div className="font-medium">Noah Williams</div>
    //                                             <div className="hidden text-sm text-muted-foreground md:inline">
    //                                                 noah@example.com
    //                                             </div>
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             Subscription
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             <Badge className="text-xs" variant="outline">
    //                                                 Approved
    //                                             </Badge>
    //                                         </TableCell>
    //                                         <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
    //                                             2023-06-25
    //                                         </TableCell>
    //                                         <TableCell className="text-right">$350.00</TableCell>
    //                                     </TableRow>
    //                                     <TableRow>
    //                                         <TableCell>
    //                                             <div className="font-medium">Emma Brown</div>
    //                                             <div className="hidden text-sm text-muted-foreground md:inline">
    //                                                 emma@example.com
    //                                             </div>
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             Sale
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             <Badge className="text-xs" variant="outline">
    //                                                 Approved
    //                                             </Badge>
    //                                         </TableCell>
    //                                         <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
    //                                             2023-06-26
    //                                         </TableCell>
    //                                         <TableCell className="text-right">$450.00</TableCell>
    //                                     </TableRow>
    //                                     <TableRow>
    //                                         <TableCell>
    //                                             <div className="font-medium">Liam Johnson</div>
    //                                             <div className="hidden text-sm text-muted-foreground md:inline">
    //                                                 liam@example.com
    //                                             </div>
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             Sale
    //                                         </TableCell>
    //                                         <TableCell className="hidden xl:table-column">
    //                                             <Badge className="text-xs" variant="outline">
    //                                                 Approved
    //                                             </Badge>
    //                                         </TableCell>
    //                                         <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
    //                                             2023-06-27
    //                                         </TableCell>
    //                                         <TableCell className="text-right">$550.00</TableCell>
    //                                     </TableRow>
    //                                 </TableBody>
    //                             </Table>
    //                         </CardContent>
    //                     </Card>
    //                     <Card x-chunk="dashboard-01-chunk-5">
    //                         <CardHeader>
    //                             <CardTitle>Recent Sales</CardTitle>
    //                         </CardHeader>
    //                         <CardContent className="grid gap-8">
    //                             <div className="flex items-center gap-4">
    //                                 <Avatar className="hidden h-9 w-9 sm:flex">
    //                                     <AvatarImage src="/avatars/01.png" alt="Avatar" />
    //                                     <AvatarFallback>OM</AvatarFallback>
    //                                 </Avatar>
    //                                 <div className="grid gap-1">
    //                                     <p className="text-sm font-medium leading-none">
    //                                         Olivia Martin
    //                                     </p>
    //                                     <p className="text-sm text-muted-foreground">
    //                                         olivia.martin@email.com
    //                                     </p>
    //                                 </div>
    //                                 <div className="ml-auto font-medium">+$1,999.00</div>
    //                             </div>
    //                             <div className="flex items-center gap-4">
    //                                 <Avatar className="hidden h-9 w-9 sm:flex">
    //                                     <AvatarImage src="/avatars/02.png" alt="Avatar" />
    //                                     <AvatarFallback>JL</AvatarFallback>
    //                                 </Avatar>
    //                                 <div className="grid gap-1">
    //                                     <p className="text-sm font-medium leading-none">
    //                                         Jackson Lee
    //                                     </p>
    //                                     <p className="text-sm text-muted-foreground">
    //                                         jackson.lee@email.com
    //                                     </p>
    //                                 </div>
    //                                 <div className="ml-auto font-medium">+$39.00</div>
    //                             </div>
    //                             <div className="flex items-center gap-4">
    //                                 <Avatar className="hidden h-9 w-9 sm:flex">
    //                                     <AvatarImage src="/avatars/03.png" alt="Avatar" />
    //                                     <AvatarFallback>IN</AvatarFallback>
    //                                 </Avatar>
    //                                 <div className="grid gap-1">
    //                                     <p className="text-sm font-medium leading-none">
    //                                         Isabella Nguyen
    //                                     </p>
    //                                     <p className="text-sm text-muted-foreground">
    //                                         isabella.nguyen@email.com
    //                                     </p>
    //                                 </div>
    //                                 <div className="ml-auto font-medium">+$299.00</div>
    //                             </div>
    //                             <div className="flex items-center gap-4">
    //                                 <Avatar className="hidden h-9 w-9 sm:flex">
    //                                     <AvatarImage src="/avatars/04.png" alt="Avatar" />
    //                                     <AvatarFallback>WK</AvatarFallback>
    //                                 </Avatar>
    //                                 <div className="grid gap-1">
    //                                     <p className="text-sm font-medium leading-none">
    //                                         William Kim
    //                                     </p>
    //                                     <p className="text-sm text-muted-foreground">
    //                                         will@email.com
    //                                     </p>
    //                                 </div>
    //                                 <div className="ml-auto font-medium">+$99.00</div>
    //                             </div>
    //                             <div className="flex items-center gap-4">
    //                                 <Avatar className="hidden h-9 w-9 sm:flex">
    //                                     <AvatarImage src="/avatars/05.png" alt="Avatar" />
    //                                     <AvatarFallback>SD</AvatarFallback>
    //                                 </Avatar>
    //                                 <div className="grid gap-1">
    //                                     <p className="text-sm font-medium leading-none">
    //                                         Sofia Davis
    //                                     </p>
    //                                     <p className="text-sm text-muted-foreground">
    //                                         sofia.davis@email.com
    //                                     </p>
    //                                 </div>
    //                                 <div className="ml-auto font-medium">+$39.00</div>
    //                             </div>
    //                         </CardContent>
    //                     </Card>
    //                 </div>
    //             </main>
    //         </div>
    //         {/* <Container>
    //             <div className='account-details'>
    //                 <Row>
    //                     <Col>
    //                         <h2>Hello, {agent.username}!</h2>
    //                         <h4>Role: Admin</h4>
    //                     </Col>
    //                 </Row>
    //                 <Row>
    //                     <Col md={4} xs={12}>
    //                         <h3>Account Details</h3>
    //                     </Col>
    //                     <Col md={4} xs={12}>
    //                         <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
    //                     </Col>
    //                     <Col md={4} xs={12}>
    //                         {agent.account_id === account.id ? null : <button type="button" onClick={() => handleShow()}>Delete Account</button>}
    //                     </Col>
    //                 </Row>
    //                 <Row>
    //                     <Col>
    //                         <EditAccountFormAdmin id={id} />
    //                     </Col>
    //                 </Row>
    //                 <Row>
    //                     <Col>
    //                         <UsersTableByAccount />
    //                     </Col>
    //                 </Row>
    //                 <Row>
    //                     <Col>
    //                         <QuotesTableByAccount />
    //                     </Col>
    //                 </Row>
    //                 <Row>
    //                     <Col>
    //                         <CustomersTableByAccount />
    //                     </Col>
    //                 </Row>
    //             </div >
    //         </Container>
    //         <Modal show={show} onHide={handleClose}>
    //             <Modal.Header closeButton>
    //                 <Modal.Title>Deleting Account</Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body>!!PLEASE CONFIRM!! Deleting the Account will delete all users, quotes, customers, and configurations associated to this account.  Are you sure you wish to delete?</Modal.Body>
    //             <Modal.Footer>
    //                 <Button variant="secondary" onClick={handleClose}>
    //                     Close
    //                 </Button>
    //                 <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
    //                     Yes, I am sure I want to delete this account.
    //                 </Button>
    //             </Modal.Footer>
    //         </Modal> */}
    //     </>
    // )
}

export default AdminView
