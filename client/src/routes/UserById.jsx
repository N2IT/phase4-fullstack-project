import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import SalesEditUserForm from '../components/SalesEditUserForm';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InvalidCredentials from '../components/InvalidCredentials';

const UserById = () => {
    const { agent, user, setUser, isLoading, deleteUserObject, setShow, show, handleClose, handleShow } = useContext(AgentContext)
    const { id } = useParams();

    const handleDeleteClick = () => {
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
        });
        deleteUserObject(id, user)
        setShow(false)
    }

    useEffect(() => {
        const storedUser = window.localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            try {
                window.localStorage.setItem('user', JSON.stringify(user));
            } catch (error) {
                console.error("Error stringifying user data:", error);
            }
        }
    }, [user]);


    if (isLoading) {
        return <div> Loading ... </div>
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    if (agent.role_id === 1 && user) {
        return (
            <>
                <Container>
                    <div className="account-details">
                        <Row>
                            <Col md={4} xs={12}>
                                <h2>Hello, {agent.username}</h2>
                                <h3>User Details</h3>
                            </Col>
                            <Col md={4} xs={12}>
                                <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                            </Col>
                            <Col md={4} xs={12}>
                                {user.id === agent.id ? null : <button type="button" onClick={() => handleShow()}>Delete User</button>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <EditUserForm id={id} />
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
                                <h2>Hello, {user.username}</h2>
                                <h3>User Details</h3>
                            </Col>
                            <Col md={4} xs={12}>
                                <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                            </Col>
                            <Col md={4} xs={12}>
                                {user.id === agent.id ? null : <button type="button" onClick={() => handleShow()}>Delete User</button>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <EditUserForm id={id} />
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
                            <Col md={6} sm={12}>
                                <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                            </Col>
                        </Row>
                        <Row>
                            <SalesEditUserForm id={id} />
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