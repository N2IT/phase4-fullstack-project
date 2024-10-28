import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useContext, useEffect, useState } from 'react';
import { AgentContext } from '../AgentProvider';
import { compChartData, showRecentSales } from '../lib/utils';
import { Component } from './BarChart';

const AdminCompCards = () => {

    const { agent, accounts, setAccounts, setIsLoading } = useContext(AgentContext);

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

    //toggle to set true or false based on which card is clicked
    const [toggle, setToggle] = useState(false);

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
                        <Card id='accounts' className='stat-card mt-3'>
                            <Card.Body>
                                <Card.Title>Accounts</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {compChartData(accts, 'show all')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{compChartData(accts, 'get recent')} new prev. 7 days</Card.Subtitle>
                                <Card.Link href='/accounts'>View All Accounts</Card.Link>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={4} className='mt-3'>
                        <Card id='customers' className='stat-card'>
                            <Card.Body>
                                <Card.Title>Customers</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {compChartData(allCustomers, 'show all')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{compChartData(allCustomers, 'get recent')} new prev. 7 days</Card.Subtitle>
                                <Card.Link href='/customers'>View all Customers</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={4}>
                        <Card id='orders' className='stat-card mt-3'>
                            <Card.Body>
                                <Card.Title>Orders</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {compChartData(allOrders, 'show all')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{compChartData(allOrders, 'get recent')} new prev. 7 days</Card.Subtitle>
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
                                <Card.Subtitle className="mb-2 text-muted">$ {showRecentSales(allOrders)} new this week</Card.Subtitle>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col sm={4} className='mt-3'>
                        <Card id='quotes' className='stat-card'>
                            <Card.Body>
                                <Card.Title>Quotes</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {compChartData(allQuotes, 'show all')}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{compChartData(allQuotes, 'show recent')} </Card.Subtitle>
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
                                <Card.Subtitle className="mb-2 text-muted">$ {showRecentSales(allQuotes)} new this week</Card.Subtitle>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <Row>
                    <Component accounts={accounts} dataType="quotes" />
                </Row>
            </Container>
        </>
    );
}

export default AdminCompCards;