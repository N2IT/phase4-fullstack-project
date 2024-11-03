import { useContext } from 'react';
import EditAccountFormGeneral from './forms/EditAccountFormGeneral';
import UsersTableByAccount from './tables/UsersTableByAccount';
import QuotesTableByAccount from './tables/QuotesTableByAccount';
import CustomersTableByAccount from './tables/CustomersTableByAccount';
import { AgentContext } from '../AgentProvider';
import { useParams } from 'react-router-dom';
import AccountCompCards from './AccountCompCards';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Progress } from "@/components/ui/progress"
import OrdersTable from './tables/OrdersTable';

// import {Column} from 'react-bootstrap';

const ManagerView = ({ account }) => {

    const { agent, user } = useContext(AgentContext);
    const { id } = useParams()

    return (
        <>
            <div className='account-details'>
                <Container>
                    <Row>
                        <Col><h2>Hello, {agent.username}:</h2></Col>
                    </Row>
                    <Row>
                        <Col><h3>Account Details</h3></Col>
                    </Row>
                </Container>
                {/* <EditAccountFormGeneral id={id} /> */}
            </div>
            <Container>
                <AccountCompCards account={account} />
                <Card className='mb-3'>
                    <Card.Body>
                        <QuotesTableByAccount />
                    </Card.Body>
                </Card>
                <Card className='mb-3'>
                    <Card.Body>
                        <CustomersTableByAccount />
                    </Card.Body>
                </Card>
                <Card className='mb-3'>
                    <Card.Body>
                        <div className="account-details">
                            <div>
                                <h3>Orders Table</h3>
                            </div>
                            <OrdersTable acctOrders={account.orders} />
                        </div>
                    </Card.Body>
                </Card>
                <Card className='mb-3'>
                    <Card.Body>
                        <UsersTableByAccount />
                    </Card.Body>
                </Card>

            </Container>
        </>
    )

}

export default ManagerView