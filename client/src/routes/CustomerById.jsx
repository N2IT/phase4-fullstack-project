import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditCustomerForm from '../components/forms/EditCustomerForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import QuoteTableByCustomer from '../components/tables/QuoteTableByCustomer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';


const CustomerById = () => {
    const { agent, setAccount, customer, deleteCustomerObject, setCustomer, setAsDisabled, setQuotes, errors = [], setErrors, isLoading, show, handleShow, setShow, handleClose } = useContext(AgentContext)
    const { id } = useParams();

    const handleDeleteClick = () => {
        fetch(`/api/customers/${id}`, {
            method: 'DELETE',
        });
        deleteCustomerObject(id, customer)
        setShow(false)
    }

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/customers/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setCustomer(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setCustomer(null);
            });
    }, [agent]);


    if (isLoading) {
        return <div> Loading ... </div>
    }

    return (
        <>
            {agent ? (
                customer ? (
                    <>
                        <Container>
                            <div className='account-details'>
                                <Row className='mb-3'>
                                    <Col md={4} xs={12}>
                                        <h2>Customer Details</h2>
                                    </Col>
                                    <Col className="d-flex justify-content-end gap-2">
                                        <Button variant='dark' type="button" onClick={() => history.go(-1)}>Return to Prev. page</Button>
                                        {agent.role_id === 3 ? null : <Button variant='danger' type="button" onClick={() => handleShow()}>Delete Customer</Button>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <EditCustomerForm id={id} />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className='mt-3 mb-3'>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <QuoteTableByCustomer />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Deleting Customer</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>!!PLEASE CONFIRM!! You are about to delete this customer and all related quotes from this account. Do you wish to proceed?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
                                    Yes, I am sure I want to proceed.
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That customer does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );


}

export default CustomerById