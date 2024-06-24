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

const UserById = () => {
    const { agent, user, setUser, setAsDisabled, errors = [], setErrors, isLoading, deleteUserObject, setShow, show, handleClose, handleShow } = useContext(AgentContext)
    const { id } = useParams();

    const handleDeleteClick = () => {
        fetch(`/api/users/${id}`, {
            method: 'DELETE',
        });
        deleteUserObject(id, user)
        setShow(false)

    }

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/users/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setUser(null);
            });
    }, [id, agent, setUser, setAsDisabled, setErrors]);

    if (isLoading) {
        return <div> Loading ... </div>
    }

    if (agent.role_id === 1 && user || agent.role_id === 2 && user) {
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

    return (
        <>
            {agent ? (
                user ? (
                    <div className='account-details'>
                        <h2>User Details</h2>
                        <SalesEditUserForm id={id} />
                    </div>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That user does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );


}

export default UserById