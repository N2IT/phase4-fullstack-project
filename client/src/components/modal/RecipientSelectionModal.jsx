import { Modal, ListGroup, FormCheck, FormControl, InputGroup } from 'react-bootstrap';
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from 'react';
import { AgentContext } from '../../AgentProvider';
import { formatCurrency, tksFormat } from '../../lib/utils';
import MessageModal from './MessageModal';

const RecipientSelectionModal = ({ show, handleClose, recipients, selectedRecipients = [], setSelectedRecipients, isCustomer = false }) => {

    const { agent, user, quote } = useContext(AgentContext);
    const [customEmail, setCustomEmail] = useState('');
    const [extraRecipients, setExtraRecipients] = useState([]);
    const [message, setMessage] = useState(isCustomer ? '' : 'NOTE: This is only a quote preview, the final quote may vary. Please contact us for more information.');
    const [showMessageModal, setShowMessageModal] = useState(false);

    // loop through and compare emails to prevent duplicates
    const uniqueRecipients = recipients.filter((v, i, a) => a.findIndex(t => (t.email === v.email)) === i);

    const handleSelectRecipient = (recipient) => {
        if (selectedRecipients.includes(recipient)) {
            if (recipient.id) setSelectedRecipients(selectedRecipients.filter(r => r !== recipient));
            else setExtraRecipients(extraRecipients.filter(r => r !== recipient));
        } else {
            setSelectedRecipients([...selectedRecipients, recipient]);
        }
    };

    const handleAddCustomEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (customEmail && emailRegex.test(customEmail) && !selectedRecipients.some(r => r.email === customEmail)) {
            const obj = { first_name: '', last_name: '', email: customEmail };
            setExtraRecipients([...extraRecipients, obj]);
            setSelectedRecipients([...selectedRecipients, obj]);
            setCustomEmail('');
        } else {
            alert('Please enter a valid email address.');
        }
    };

    const handleSendEmail = () => {
        const quoteCopy = { ...quote }
        let amt = 0;
        quoteCopy.screenconfigurations.map((configurator) => {
            configurator.description;
            configurator.list_price;
            amt += configurator.unit_total;
        });
        quoteCopy.formatted_quote_total = formatCurrency(amt);

        // put all the selected recipients into an array of email addresses
        const emails = selectedRecipients.map(recipient => recipient.email);

        fetch('/api/send-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quote: quoteCopy, recipients: isCustomer ? null : emails, message })
        })
            .then(response => response.json())
            .then(data => {
                setShowMessageModal(true);
                handleClose();
            });

    };

    useEffect(() => {
        if (isCustomer) {
            setSelectedRecipients([recipients?.[0]]);
        }
    }, [isCustomer]);

    

    return (
        showMessageModal ?
            <MessageModal message="Email sent successfully!" duration={3000} onClose={() => {
                handleClose();
                setShowMessageModal(false);

            }} />
            :
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Recipients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {[...uniqueRecipients, ...extraRecipients].map((recipient, index) => (
                            <ListGroup.Item key={index}>
                                <FormCheck
                                    type="checkbox"
                                    label={recipient.id ? `${agent.id === recipient.id ? "[You] " : ""}${recipient.first_name} ${recipient.last_name} (${recipient.email})` : <>[Added] <i>{recipient.email}</i></>}
                                    checked={selectedRecipients.includes(recipient)}
                                    onChange={() => {
                                        if (!isCustomer) handleSelectRecipient(recipient)
                                    }}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {!isCustomer && <InputGroup className="mt-3">
                        <FormControl
                            placeholder="Add email address"
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                        />
                        <Button onClick={handleAddCustomEmail}>
                            Add Email
                        </Button>
                    </InputGroup>}
                    <div className="mt-3">
                        <label htmlFor="messageInput">Message</label>
                        <FormControl
                            id="messageInput"
                            as="textarea"
                            rows={3}
                            placeholder="Enter your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleSendEmail} disabled={selectedRecipients.length === 0}>
                        Send Email
                    </Button>
                </Modal.Footer>
            </Modal>

    );
};

export default RecipientSelectionModal;