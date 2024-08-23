import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
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
            if (quote.converted === 'No') {
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
            <Container>
                <div className='account-details'>
                    <Row>
                        <Col>
                            <h2>Hello, {agent.username}!</h2>
                            <h4>Role: Admin</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} xs={12}>
                            <h3>Account Details</h3>
                        </Col>
                        <Col md={4} xs={12}>
                            <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                        </Col>
                        <Col md={4} xs={12}>
                            {agent.account_id === account.id ? null : <button type="button" onClick={() => handleShow()}>Delete Account</button>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <EditAccountFormAdmin id={id} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <UsersTableByAccount />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <QuotesTableByAccount />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CustomersTableByAccount />
                        </Col>
                    </Row>
                </div >
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>!!PLEASE CONFIRM!! Deleting the Account will delete all users, quotes, customers, and configurations associated to this account.  Are you sure you wish to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
                        Yes, I am sure I want to delete this account.
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminView
