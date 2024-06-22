import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AgentContext } from '../AgentProvider';

function DeleteModal({id}) {
  const { account, show, handleClose, handleDeleteClick } = useContext(AgentContext);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>!!PLEASE CONFIRM!! Deleting the Account will delete all users, quotes, customers, and configurations associated to this account.  Are you sure you wish to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(handleClose, handleDeleteClick(account))}>
            Yes, I am sure I want to delete this account.
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;