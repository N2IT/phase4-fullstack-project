import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useEffect, useState } from 'react';
import { AgentContext } from '../AgentProvider';
import { compChartData } from '../lib/utils';

const AdminCompCards = () => {

    const { agent, accounts, setAccounts, setIsLoading, isLoading } = useContext(AgentContext);

    useEffect(() => {
        fetch('/api/accounts')
            .then((r) => r.json())
            .then((account) => setAccounts(account))
            .then(() => setIsLoading(false))
            .catch(error => console.error("Error:", error));

    }, [agent])

    const allCustomers = accounts.flatMap(account => account.customers);
    const allQuotes = accounts.flatMap(account => account.quotes);
    const accts = accounts
    const allOrders = accounts.flatMap(account => account.orders);


    const customerChartComp = (value = null) => {
        let older = [];
        let pastSevenDays = [];

        // Loop through all accounts to gather customers
        const allCustomers = accounts.flatMap(account => account.customers);

        // Process each customer across all accounts
        allCustomers.forEach((customer) => {
            const currentDate = new Date();
            let createDate = new Date(customer.created_at);
            const timeDifference = currentDate - createDate;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

            if (daysDifference > 7 && daysDifference <= 14) {
                older.push(customer);
            }
            if (daysDifference <= 7) {
                pastSevenDays.push(customer);
            }
        });

        // Return the number of recent customers if requested
        if (value === 'show all') {
            return allCustomers.length;
        }

        if (value === 'get recent') {
            if (pastSevenDays.length === 0) {
                return 'No new customers this week';
            }

            if (pastSevenDays.length === 1) {
                return pastSevenDays.length + ' new customer this week';
            }

            return pastSevenDays.length;
        }

        // Handle the case where there are no older customers to compare
        if (older.length === 0) {
            return 'No customers from the previous week to compare.';
        }

        // Calculate the percentage change from last week
        let calculated = (pastSevenDays.length - older.length) / older.length;
        return calculated.toFixed(2) + '%' + " from last week";
    };

    const quoteChartComp = (value = null) => {

        let older = []
        let pastSevenDays = []

        // Loop through all accounts to gather quotes
        const allQuotes = accounts.flatMap(account => account.quotes);

        // Process each quote across all accounts
        allQuotes.forEach((quote) => {
            const currentDate = new Date();
            let createDate = new Date(quote.created_at);
            const timeDifference = currentDate - createDate;
            const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

            if (daysDifference > 7 && daysDifference <= 14) {
                older.push(quote);
            }
            if (daysDifference <= 7) {
                pastSevenDays.push(quote);
            }
        });

        // Return the number of recent quotes if requested
        if (value === 'get recent') {
            return pastSevenDays.length;
        }

        // Handle the case where there are no older quotes to compare
        if (older.length === 0) {
            return 'No quotes from the previous week to compare.';
        }

        // Calculate the percentage change from last week
        let calculated = (pastSevenDays.length - older.length) / older.length;
        return calculated.toFixed(2) + '%' + ' from last week';
    };

    const openQuoteComp = () => {
        const openQuote = []
        const allQuotes = accounts.flatMap(account => account.quotes);
        allQuotes.forEach((quote) => {
            if (quote.converted === 'No') {
                openQuote.push(quote);
            }
        });
        let calculated = openQuote.length;
        return calculated;
    };

    const quoteDollarsChartComp = (value = null) => {
        let older = [];
        let pastSevenDays = [];
        let allTime = [];
        let openTotal = [];
        const allQuotes = accounts.flatMap(account => account.quotes);
        allQuotes.forEach((quote) => {
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
            if (value === 'open total') {
                openTotal.push(quote.sale_price);
            }
            if (value === 'get total') {
                allTime.push(quote.sale_price);
            }
        });

        const totalOlder = older.reduce((acc, curr) => acc + curr, 0);
        const totalPastSevenDays = pastSevenDays.reduce((acc, curr) => acc + curr, 0);
        const totalAllTime = allTime.reduce((acc, curr) => acc + curr, 0);
        const currentOpenTotal = openTotal.reduce((acc, curr) => acc + curr, 0);

        if (value === 'open total') {
            return parseFloat(currentOpenTotal);
        }
        if (value === 'get total') {
            return parseFloat(totalAllTime);
        }
        if (totalOlder === 0) {
            return 'No quote dollars from the previous week to compare.';
        }

        let percentageChange = ((totalPastSevenDays - totalOlder) / totalOlder) * 100;
        return `Percentage change from last week: ${percentageChange.toFixed(2)}%`;
    };

    if (!accounts) {
        return <div> Loading ... </div>
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2>Hello, {agent.username}!</h2>
                        <h4>Role: Admin</h4>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col sm={4}>
                        <Card className='stat-card mt-3'>
                            <Card.Body>
                                <Card.Title>Accounts</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {compChartData(accts, 'show all')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{compChartData(accts, 'get recent')} </Card.Subtitle>
                                <Card.Link href='/accounts'>View All Accounts</Card.Link>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={4} className='mt-3'>
                        <Card className='stat-card'>
                            <Card.Body>
                                <Card.Title>Customers</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {compChartData(allCustomers, 'show all')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{compChartData(allCustomers, 'get recent')}</Card.Subtitle>
                                <Card.Link href='/customers'>View all Customers</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Card className='stat-card mt-3'>
                            <Card.Body>
                                <Card.Title>Orders</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {compChartData(allOrders, 'show all')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{compChartData(allOrders, 'get recent')}</Card.Subtitle>
                                <Card.Link href='/orders'>View all Orders</Card.Link>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col sm={4}>
                        <Card className='stat-card mt-3'>
                            <Card.Body>
                                <Card.Title>Sales Revenue</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    $ {compChartData(allOrders, 'get total', 'dollar')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">$ {compChartData(allOrders, 'get recent', 'dollar')} new this week</Card.Subtitle>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={4} className='mt-3'>
                        <Card className='stat-card'>
                            <Card.Body>
                                <Card.Title>Quotes</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {compChartData(allQuotes, 'show all')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{compChartData(allQuotes, 'show recent')}</Card.Subtitle>
                                <Card.Link href='/quotes'>View All Quotes</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Card className='stat-card mt-3'>
                            <Card.Body>
                                <Card.Title>Open Quote $ Value</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    $ {compChartData(allQuotes, 'get total', 'dollar')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">$ {compChartData(allQuotes, 'get recent', 'dollar')} new this week</Card.Subtitle>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminCompCards;