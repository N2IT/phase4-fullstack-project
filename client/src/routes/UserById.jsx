import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditUserFormAdminManager from '../components/forms/EditUserFormAdminManager';
import EditUserFormSales from '../components/forms/EditUserFormSales';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InvalidCredentials from '../components/InvalidCredentials';
import { Card } from 'react-bootstrap';

const UserById = () => {
    const { agent, setUser, user, isLoading, deleteUserObject, setAsDisabled, setShow, show, handleClose, handleShow, setErrors } = useContext(AgentContext)
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(user => {
                setUser(user);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setUser(null);
            });
    }, [agent, id]);

    const handleDeleteClick = () => {
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
        });
        deleteUserObject(id, user)
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

    if (agent && !user) {
        return (
            <InvalidCredentials />
        )
    }

    if (agent.role_id === 1) {
        return (
            <>
                <Container>
                    <div className="account-details">
                        <Row>
                            <Col md={4} xs={12}>
                                <h2>Hello, {agent.username}</h2>

                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col md={4} xs={12}>
                                <h3>User Details</h3>
                            </Col>

                            <Col className="d-flex justify-content-end gap-2">
                                <Button variant='dark' type="button" onClick={() => history.go(-1)}>Return to Prev. page</Button>
                                {user.id === agent.id ? null : <Button variant='danger' type="button" onClick={() => handleShow()}>Delete User</Button>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <EditUserFormAdminManager id={id} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deleting User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>!!PLEASE CONFIRM!! You are about to delete {user.username} from this account. Are you sure?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
                            Yes, I am sure I want to delete this user.
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    if (agent.role_id === 2 && agent.account_id === user.account_id) {
        return (
            <>
                <Container>
                    <div className="account-details">
                        <Row>
                            <Col md={4} xs={12}>
                                <h2>Hello, {agent.username}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} xs={12}>
                                <h3>User Details</h3>
                            </Col>
                            <Col className="d-flex justify-content-end gap-2">
                                <Button variant='dark' type="button" onClick={() => history.go(-1)}>Return to Prev. page</Button>
                                {user.id === agent.id ? null : <Button variant='danger' type="button" onClick={() => handleShow()}>Delete User</Button>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <EditUserFormAdminManager id={id} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deleting User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>!!PLEASE CONFIRM!! You are about to delete {user.username} from this account. Are you sure?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
                            Yes, I am sure I want to delete this user.
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    if (agent.role_id === 3 && agent.account_id === user.account_id) {
        return (
            <>
                <Container>
                    <div className='account-details'>
                        <Row>
                            <Col md={6} sm={12}>
                                <h2>User Details</h2>
                            </Col>
                            <Col className="d-flex justify-content-end gap-2">
                                <Button variant='dark' type="button" onClick={() => history.go(-1)}>Return to Prev. page</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Card>
                                <Card.Body>
                                    <EditUserFormSales id={id} />
                                </Card.Body>
                            </Card>
                        </Row>
                    </div>
                </Container>
            </>
        )
    }

    return (
        <>
            <InvalidCredentials />
        </>
    );
}

export default UserById