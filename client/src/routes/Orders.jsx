import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import OrdersTable from '../components/tables/OrdersTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import LoadingPage from '../components/LoadingPage';

const Orders = () => {

  const { agent, order, setOrder, orders, setOrders, isLoading, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((order) => setOrders(order))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));

  }, [agent])

  if (!orders || isLoading ) {
    return <LoadingPage />
  }

  return (
    <>
      <div className="account-details">
        {agent.role_id === 1 ?
          <Container>
            <Row className='mb-3'>
              <Col md={4} sm={12}>
                <div>
                  <h2>Order Table</h2>
                </div>
              </Col>
              <Col>
                <div className="d-flex justify-content-end gap-2">
                  <Button onClick={() => history.go(-1)}>Return to Previous Page</Button>
                </div>
              </Col>
            </Row>
            <Card className='mb-3'>
              <Card.Body>
                <OrdersTable />
              </Card.Body>
            </Card>
          </Container>
          : (
            <div>
              <InvalidCredentials />
            </div>
          )
        }
      </div>
    </>
  );

}
export default Orders;