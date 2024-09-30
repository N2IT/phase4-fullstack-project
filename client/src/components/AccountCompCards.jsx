import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AccountCompCards = ({ account }) => {

    const customerChartComp = (value = null) => {
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
        if (value === 'get recent') {
            return pastSevenDays.length
        }
        if (older.length === 0) {
            return 'No customers from the previous week to compare.';
        }
        let calculated = (pastSevenDays.length - older.length) / older.length;
        return calculated.toFixed(2) + '%' + " " + 'from last week';
    };

    const quoteChartComp = (value = null) => {

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
        if (value === 'get recent') {
            return pastSevenDays.length
        }
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
            if (quote.converted === 'No') {
                openQuote.push(quote)
            }
        })
        let calculated = openQuote.length
        return calculated
    }

    const quoteDollarsChartComp = (value = null) => {
        let older = [];
        let pastSevenDays = [];
        let allTime = []
        let openTotal = []
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
            if (value === 'open total') {
                openTotal.push(quote.sale_price)
            }
            if (value === 'get total') {
                allTime.push(quote.sale_price)
            }
        });

        const totalOlder = older.reduce((acc, curr) => acc + curr, 0);
        const totalPastSevenDays = pastSevenDays.reduce((acc, curr) => acc + curr, 0);
        const totalAllTime = allTime.reduce((acc, curr) => acc + curr, 0);
        const currentOpenTotal = openTotal.reduce((acc, curr) => acc + curr, 0);

        if (value === 'open total') {
            return parseFloat(currentOpenTotal)
        }
        if (value === 'get total') {
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
            <Row className='mb-3'>
                <Col sm={6}>
                    <Card className='stat-card mt-3'>
                        <Card.Body>
                            {/* <Card.Title>Card Title</Card.Title> */}
                            <Card.Subtitle className="mb-2"><h2>{account.company_name}</h2></Card.Subtitle>
                            <Card.Text>
                                <p>{account.address_1} {account.address_2} <br /> {account.city}, {account.state} {account.zip_code}<br />{account.phone}</p>
                            </Card.Text>
                            {/* <Card.Link href="#">Card Link</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={6}>
                    <Card className='stat-card mt-3'>
                        <Card.Body>
                            <Card.Title>Quotes Approved / Not Ordered</Card.Title>
                            <Card.Text className='card-fontsize'>
                                4
                            </Card.Text>
                            {/* <Card.Subtitle className="mb-2 text-muted">+ or - % over prev 7 days</Card.Subtitle> */}
                            {/* <Card.Link href={`/accounts/${account.id}/add-customer`}>Create New Customer</Card.Link> */}
                            <Card.Link href="#">View quotes ready for order</Card.Link>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            <Row>
                <Col md={3} sm={6} xs={12} className='mb-3'>
                    <Card className='stat-card'>
                        <Card.Body className='text-center'>
                            <Card.Title>Sales Revenue</Card.Title>
                            <Card.Text className='card-fontsize'>
                                $45,983.90
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">+ or - % over prev 7 days</Card.Subtitle>
                            {/* <Card.Link href={`/accounts/${account.id}/add-customer`}>Create New Customer</Card.Link> */}
                            {/* <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} xs={12} className='mb-3'>
                    <Card className='stat-card'>
                        <Card.Body className='text-center'>
                            <Card.Title>Orders</Card.Title>
                            <Card.Text className='card-fontsize'>
                                6
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">+ or - % over prev 7 days</Card.Subtitle>
                            {/* <Card.Link href={`/accounts/${account.id}/add-customer`}>Create New Customer</Card.Link> */}
                            {/* <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} xs={12} className='mb-3'>
                    <Card className='stat-card'>
                        <Card.Body className='text-center'>
                            <Card.Title>Customers</Card.Title>
                            <Card.Text className='card-fontsize'>
                                {customerChartComp('get recent')}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">{customerChartComp()}</Card.Subtitle>
                            {/* <Card.Link href={`/accounts/${account.id}/add-customer`}>Create New Customer</Card.Link> */}
                            {/* <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} xs={12} className='mb-3'>
                    <Card className='stat-card'>
                        <Card.Body className='text-center'>
                            <Card.Title>Quotes</Card.Title>
                            <Card.Text className='card-fontsize'>
                                {quoteChartComp('get recent')}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">{quoteChartComp()}</Card.Subtitle>
                            {/* <Card.Link href={`/accounts/${account.id}/new-quote`}>Create New Quote</Card.Link> */}
                            {/* <Card.Link href="#">Another Link</Card.Link> */}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default AccountCompCards;