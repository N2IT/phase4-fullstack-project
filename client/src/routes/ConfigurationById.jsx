import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgentContext } from '../AgentProvider';
import Unauthorized from '../components/Unauthorized';
import EditConfigurationForm from '../components/forms/EditConfigurationForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InvalidCredentials from '../components/InvalidCredentials';

const ConfigurationById = () => {
    const { agent, isLoading, configuration, setShow, deleteConfigurationObject, show, handleClose, handleShow } = useContext(AgentContext);
    const { id } = useParams();

    const handleDeleteClick = () => {
        fetch(`/api/configurations/${id}`, {
            method: 'DELETE',
        });
        deleteConfigurationObject(id, configuration)
        setShow(false)
    }

    const duplicateConfig = async () => {
        try {
            // Make the POST request to the backend, including the id variable
            const response = await fetch('/api/duplicate-configuration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send the id to the backend
            });

            const result = await response.json();
            console.log('Backend Response:', result); // Handle the response as needed
            history.go(-1)
            alert('The configuration has been cloned')
        } catch (error) {
            console.error('Error calling backend:', error);
        }
    };

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    // if (agent && !configuration) {
    //     return (
    //         <InvalidCredentials />
    //     )
    // }

    if (agent.role_id === null && configuration) {
        return (
            <div className='account-details'>
                <h2>Please contact your administrator to assign your role within the account.</h2>
            </div>
        );
    }

    if (agent.role_id === 1) {
        return (
            <>
                <div className='account-details'>
                    <Container>
                        <Row>
                            <Col md={4} sm={12}>
                                <h2>Configuration Details</h2>
                            </Col>
                            <Col className="d-flex justify-content-end gap-2">
                                <Button variant='dark' type="button" onClick={() => history.go(-1)}>Return to Prev. page</Button>
                                {agent.role_id !== 3 ? <Button variant='danger' type="button" onClick={() => handleShow()}>Delete Configuration</Button> : null}
                                <Button variant='secondary' type='button' onClick={() => duplicateConfig()}>Duplicate Configuration</Button>

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

    if (agent.role_id !== 1 && agent.account_id) {
        return (
            <>
                <Container>
                    <div className='account-details'>
                        <Row>
                            <Col md={4} sm={12}>
                                <h2>Configuration Details</h2>
                            </Col>
                            <Col className="d-flex justify-content-end gap-2">
                                <Button variant='dark' type="button" onClick={() => history.go(-1)}>Return to Prev. page</Button>
                                {agent.role_id !== 3 ? <Button variant='danger' type="button" onClick={() => handleShow()}>Delete Configuration</Button> : null}
                                <Button variant='secondary' type='button' onClick={() => duplicateConfig()}>Duplicate Configuration</Button>
                            </Col>
                        </Row>
                        <Row>
                            <EditConfigurationForm id={id} />
                        </Row>
                    </div>
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
            </>
        )
    }
}

export default ConfigurationById
