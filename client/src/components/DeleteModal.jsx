import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { AgentContext } from '../AgentProvider';

function DeleteModal() {
  const { show, setShow, handleShow, handleClose } = useContext(AgentContext);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>!!PLEASE CONFIRM!! Deleting the Account will delete all users, quotes, customers, and configurations associated to this account.  Are you sure you wish to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(handleClose, console.log('account deleted'))}>
            Yes, I am sure I want to delete this account.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;