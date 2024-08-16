import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AgentContext } from '../AgentProvider';
import Unauthorized from '../components/Unauthorized';
import EditConfigurationForm from '../components/forms/EditConfigurationForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ConfigurationById = () => {

    const { agent, isLoading, configuration, setShow, setConfiguration, setAsDisabled, setErrors, show, handleClose, handleShow } = useContext(AgentContext);
    const { id } = useParams();
    const [configurations, setConfigurations] = useState([]);

    const deleteConfigurationObject = (id, configuration) => {
        const updatedConfigurations = configurations.filter(configuration => configuration.id !== id);
        setConfigurations(updatedConfigurations)
        alert(`Configuration ${configuration.id} has been successfully deleted`)
        history.go(-1)
    }

    // SUPER FUCKING STUCK HERE ON WHY THIS FETCH CALL POINTS TO 3000 AND NOT 5000

    const handleDeleteClick = () => {
        fetch(`/api/configurations/${id}`, {
            method: 'DELETE',
        });
        deleteConfigurationObject(id, configuration)
        setShow(false)
    }

    useEffect(() => {
        fetch(`/api/configurations/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setConfiguration(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setConfiguration(null);
            });

    }, []);
    
    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    if (agent.role_id === 1 && configuration) {
        return (
            <>
                <div className='account-details'>
                    <Container>
                        <Row>
                            <Col md={4} sm={12}>
                                <h2>Configuration Details</h2>
                            </Col>
                            <Col md={4} sm={12}>
                                <button type="button" onClick={() => history.go(-2)}>Return to Prev. page</button>
                            </Col>
                            <Col md={4} sm={12}>
                                {agent.role_id !== 3 ? <button type="button" onClick={() => handleShow()}>Delete Configuration</button> : null}
                            </Col>
                        </Row>
                        <Row>
                            <EditConfigurationForm id={id} />
                        </Row>
                    </Container>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Deleting Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>!!PLEASE CONFIRM!! Are you sure you wish to delete this Configuration?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
                                Yes, I am sure I want to delete this quote.
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </>
        );
    }

    if (configuration && agent.role_id !== 1 && agent.account_id === configuration.quote.account_id) {
        return (
            <>
                <div className='account-details'>
                    <Container>
                        <Row>
                            <Col md={4} sm={12}>
                                <h2>Configuration Details</h2>
                            </Col>
                            <Col md={4} sm={12}>
                                <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                            </Col>
                            <Col md={4} sm={12}>
                                {agent.role_id !== 3 ? <button type="button" onClick={() => handleShow()}>Delete Configuration</button> : null}
                            </Col>
                        </Row>
                        <Row>
                            <EditConfigurationForm id={id} />
                        </Row>
                    </Container>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Deleting Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>!!PLEASE CONFIRM!! Are you sure you wish to delete this Configuration?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
                                Yes, I am sure I want to delete this quote.
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        )
    }
}

export default ConfigurationById
