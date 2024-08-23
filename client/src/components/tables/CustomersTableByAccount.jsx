import { useContext, useEffect } from 'react';
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    SunMedium,
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

const CustomersTable = () => {
    console.log('CustomersTableByAccount')
    const { handleIdClick, account, isLoading, customers, navigate, setCustomers, setNewCustomerForQuote, setErrors, setAsDisabled } = useContext(AgentContext);
    const { id } = useParams()

    // useEffect(() => {
    //     fetch('/api/customers')
    //         .then(response => {
    //             if (!response.ok) {
    //                 return response.json().then(data => { throw data; });
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setCustomers(data);
    //             setAsDisabled(true);
    //             // setErrors(null);
    //         })
    //         .catch(error => {
    //             console.error('Errors:', error);
    //             setErrors([error.errors] || ['Unknown Error']);
    //             setCustomers(null);
    //         });
    // }, [id]);

    const customersByAccount = account.customers.filter(customer => {
        return account.id.toString() === id;
    })

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
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
                        <Button asChild size="sm" className="ml-auto gap-1" onClick={() => (navigate(`accounts/${id}/add-customer`), setNewCustomerForQuote(false))}>
                            <span>Create New Customer<ArrowUpRight className="h-4 w-4" /></span>
                            {/* LEAVING OFF HERE */}
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table className="min-w-full lg:grid-cols-1">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Number</TableHead>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customersByAccount.map((customer) => (
                                    <TableRow key={customer.email}>
                                        <TableCell>{customer.id}</TableCell>
                                        <TableCell>{customer.first_name}</TableCell>
                                        <TableCell>{customer.last_name}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell><p className='view-btn' onClick={() => handleIdClick(customer)}></p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* <TableCell>
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
                            </TableRow> */}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                {/* <Card x-chunk="dashboard-01-chunk-5">
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
            </Card> */}
            </div >
            {/* <Container>
                <div className="account-details">
                    <Row>
                        <Col md={6} sm={12}>
                            <h3>Account Customers</h3>
                        </Col>
                        <Col md={6} sm={12}>
                            <button type="button" onClick={() => (navigate(`accounts/${id}/add-customer`), setNewCustomerForQuote(false))}>Add New Customer</button>
                        </Col>
                    </Row>
                </div>
            </Container>
            {isLoading ? <h2>Loading...</h2> :
                <Table responsive="sm" striped="columns">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customersByAccount.map((customer) => (
                            <tr key={customer.email} className="">
                                <td>{customer.id}</td>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td><p className="view-btn" title="View Quote" onClick={() => handleIdClick(customer)}> View </p></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            } */}
        </>
    )
}

export default CustomersTable