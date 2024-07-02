import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditCustomerForm from '../components/EditCustomerForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import QuoteTableByCustomer from '../components/QuoteTableByCustomer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


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
                fetch(`/api/accounts/${data.account_id}`)
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(data => { throw data; });
                        }
                        return response.json();
                    })
                    .then(data => {
                        setAccount(data);
                        setAsDisabled(true);
                        setErrors(null);
                    })
                    .catch(error => {
                        console.error('Errors:', error);
                        setErrors([error.errors] || ['Unknown Error']);
                        setAccount(null);
                    });
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setCustomer(null);
            });
        fetch('/api/quotes')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setQuotes(data);
                setAsDisabled(true);
                // setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setQuotes(null);
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
                                <Row>
                                    <Col md={4} xs={12}>
                                        <h2>Customer Details</h2>
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                                    </Col>
                                    <Col md={4} xs={12}>
                                        {agent.role_id === 3 ? null : <button type="button" onClick={() => handleShow()}>Delete Customer</button>}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <EditCustomerForm id={id} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <QuoteTableByCustomer />
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