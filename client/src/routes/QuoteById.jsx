import { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
    const { agent, isLoading, customer, quote, handleClose, handleShow, show, setShow, setQuote, setAsDisabled, setErrors, deleteQuoteObject, setConfigurations } = useContext(AgentContext)
    const { id } = useParams();
    const {location} = useLocation()

    useEffect(() => {
        fetch(`/api/quotes/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setQuote(data);
                setConfigurations(data.configurations)
                setAsDisabled(true);
                setErrors(null);
            });
    }, [agent, id, location]);

    const handleDeleteClick = () => {
        fetch(`/api/quotes/${id}`, {
            method: 'DELETE',
        });
        deleteQuoteObject(id, quote)
        setShow(false)
    }

    if (isLoading) {
        return <div> Loading ... </div>
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    return (
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
                            <h3>For Customer: {quote.customer.first_name}&nbsp;{quote.customer.last_name} </h3>
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
    );


}

export default QuoteById