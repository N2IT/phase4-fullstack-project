import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AccountCompCards = ({ account }) => {

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
            <Container>
                <Row>
                    <Col md={3} sm={6} xs={12} className='mb-3'>
                        <Card style={{ maxWidth: '18rem', margin: 'auto', minHeight: '12rem' }}>
                            <Card.Body className='text-center'>
                                <Card.Title>Customers</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {account.customers.length}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{customerChartComp()}</Card.Subtitle>
                                {/* <Card.Link href={`/accounts/${account.id}/add-customer`}>Create New Customer</Card.Link> */}
                                {/* <Card.Link href="#">Another Link</Card.Link> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6} xs={12} className='mb-3'>
                        <Card style={{ maxWidth: '18rem', margin: 'auto', minHeight: '12rem' }}>
                            <Card.Body className='text-center'>
                                <Card.Title>Quotes</Card.Title>
                                <Card.Text className='card-fontsize'>
                                    {account.quotes.length}
                                </Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{quoteChartComp()}</Card.Subtitle>
                                {/* <Card.Link href={`/accounts/${account.id}/new-quote`}>Create New Quote</Card.Link> */}
                                {/* <Card.Link href="#">Another Link</Card.Link> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6} xs={12} className='mb-3'>
                        <Card style={{ maxWidth: '18rem', margin: 'auto', minHeight: '12rem' }}>
                            <Card.Body className='text-center'>
                                <Card.Title>Quote $</Card.Title>
                                <Card.Text className='card-fontsize'>${(quoteDollarsChartComp('get total')).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{quoteDollarsChartComp()}</Card.Subtitle>
                                {/* <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link> */}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} sm={6} xs={12} className='mb-3'>
                        <Card style={{ maxWidth: '18rem', margin: 'auto', minHeight: '12rem' }}>
                            <Card.Body className='text-center'>
                                <Card.Title>Open Quotes</Card.Title>
                                <Card.Text className='card-fontsize'>{openQuoteComp()}</Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">${(quoteDollarsChartComp('open total') / openQuoteComp()).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<br /> Avg value open quotes</Card.Subtitle>
                                {/* <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link> */}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AccountCompCards;