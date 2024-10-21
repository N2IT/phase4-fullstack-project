import { useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import EditQuoteForm from '../components/forms/EditQuoteForm';
// import SalesEditUserForm from '../components/SalesEditUserForm';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import ConfigurationsTableByQuote from '../components/tables/ConfigurationsTableByQuote';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';


const QuoteById = () => {
    const { agent, customer, quote, handleClose, handleShow, show, setShow, setCustomer, setConfigurations, setQuote, setAsDisabled, errors = [], setErrors, isLoading, deleteQuoteObject, navigate } = useContext(AgentContext)
    const { id } = useParams();

    console.log(quote.status)

    // check quote.status and if '

    const handleDeleteClick = () => {
        fetch(`/api/quotes/${id}`, {
            method: 'DELETE',
        });
        deleteQuoteObject(id, quote)
        setShow(false)
    }

    useEffect(() => {
        fetch(`/api/quotes/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                // console.log(data.customer)
                setQuote(data);
                setAsDisabled(true);
                setErrors(null);
            });
    }, [id]);

    if (isLoading) {
        return <div> Loading ... </div>
    }

    return (
        <>
            {agent ? (
                quote ? (
                    <>
                        <Container>
                            <div className='account-details'>

                                <Row>
                                    <Col md={4} sm={12}>
                                        <h2>Quote Details</h2>
                                    </Col>
                                    <Col className="d-flex justify-content-end gap-2">
                                        <Button variant='dark' type="button" onClick={() => history.go(-1)}>Return to Prev. page</Button>
                                        {quote.status !== 'closed' && (
                                        <>
                                            <Button variant = 'light' type="button" onClick={() => navigate(`quotes/${id}/preview`)}>Preview Quote</Button>
                                            {agent.role_id !== 3 ? <Button variant='danger' type="button" onClick={() => handleShow()}>Delete Quote</Button> : null}
                                        </>
                                        )}
                                    </Col>
                                </Row>
                                {!quote.customer ?
                                    'Loading' :
                                    <Row>
                                        <h3>For Customer: {quote.customer.first_name}&nbsp;{quote.customer.last_name} </h3>
                                    </Row>}
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <EditQuoteForm id={id} />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className='mt-3 mb-3'>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <ConfigurationsTableByQuote />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Deleting Account</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>!!PLEASE CONFIRM!! Deleting the Quote will delete all associated configurations.  Are you sure you wish to delete?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
                                    Yes, I am sure I want to delete this quote.
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That quote does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );


}

export default QuoteById