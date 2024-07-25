import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
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

const QuoteById = () => {
    const { agent, customer, quote, handleClose, handleShow, show, setShow, setCustomer, setConfigurations, setQuote, setAsDisabled, errors = [], setErrors, isLoading, deleteQuoteObject } = useContext(AgentContext)
    const { id } = useParams();

    const handleDeleteClick = () => {
        fetch(`/api/quotes/${id}`, {
            method: 'DELETE',
        });
        deleteQuoteObject(id, quote)
        setShow(false)
    }

    // useEffect(() => {
    //     fetch(`/api/quotes/${id}`)
    //         .then(response => {
    //             if (!response.ok) {
    //                 return response.json().then(data => { throw data; });
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setQuote(data);
    //             setAsDisabled(true);
    //             setErrors(null);
    //             fetch(`/api/customers/${data.customer_id}`)
    //             .then(response => {
    //                 if (!response.ok) {
    //                     return response.json().then(data => { throw data; });
    //                 }
    //                 return response.json();
    //             })
    //             .then(data => {
    //                 setCustomer(data);
    //                 setAsDisabled(true);
    //                 setErrors(null);
    //             })
    //         })
    //         .catch(error => {
    //             console.error('Errors:', error);
    //             setErrors([error.errors] || 'Unknown Error');
    //             setQuote(null);
    //         });

    //     fetch('/api/configurations')
    //         .then(response => {
    //             if (!response.ok) {
    //                 return response.json().then(data => { throw data; });
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setConfigurations(data);
    //             setAsDisabled(true);
    //             // setErrors(null);
    //         })
    //         .catch(error => {
    //             console.error('Errors:', error);
    //             setErrors([error.errors] || ['Unknown Error']);
    //             setConfigurations(null);
    //         });
    // }, [agent, id]);

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
                                    <Col md={4} xs={12}>
                                        <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                                    </Col>
                                    <Col md={4} xs={12}>
                                        {agent.role_id !== 3 ? <button type="button" onClick={() => handleShow()}>Delete Quote</button> : null}
                                    </Col>
                                </Row>
                                {customer ?
                                <Row>
                                     <h3>For Customer: {customer.first_name}&nbsp;{customer.last_name} </h3>
                                </Row>
                                : null}
                                <Row>
                                    <Col>
                                        <EditQuoteForm id={id} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ConfigurationsTableByQuote />
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