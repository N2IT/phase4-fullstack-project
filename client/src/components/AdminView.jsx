import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import UsersTableByAccount from '../components/UsersTableByAccount';
import AdminEditAccountForm from '../components/AdminEditAccountForm';
import QuotesTableByAccount from '../components/QuotesTableByAccount';
import CustomersTableByAccount from '../components/CustomersTableByAccount';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../AgentProvider';

const AdminView = () => {

    const { agent, account, show, handleClose, deleteAccountObject, setShow, handleShow } = useContext(AgentContext);
    const { id } = useParams();

    const handleDeleteClick = () => {
        fetch(`/api/accounts/${id}`, {
            method: 'DELETE',
        });
        deleteAccountObject(id, account)
        setShow(false)
    }

    return (
        <>
            <Container>
                <div className='account-details'>
                    <Row>
                        <Col md={4} xs={12}>
                            <h2>Hello, {agent.username}:</h2>
                            <h3>Account Details</h3>
                        </Col>
                        <Col md={4} xs={12}>
                            <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                        </Col>
                        <Col md={4} xs={12}>
                            {agent.account_id === account.id ? null : <button type="button" onClick={() => handleShow()}>Delete Account</button>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <AdminEditAccountForm id={id} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <UsersTableByAccount />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <QuotesTableByAccount />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CustomersTableByAccount />
                        </Col>
                    </Row>
                </div >
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>!!PLEASE CONFIRM!! Deleting the Account will delete all users, quotes, customers, and configurations associated to this account.  Are you sure you wish to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(handleClose, handleDeleteClick)}>
                        Yes, I am sure I want to delete this account.
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminView
