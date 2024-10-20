import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditQuoteForm from '../components/forms/EditQuoteForm';
// import SalesEditUserForm from '../components/SalesEditUserForm';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ConfigurationsTable from '../components/tables/ConfigurationsTable';
// import AccessoriesTable from '../components/tables/AccessoriesTable';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatCurrency, tksFormat } from '../lib/utils';
import RecipientSelectionModal from '../components/modal/RecipientSelectionModal';

// import QuoteLines from '../components/tables/QuoteLines';


const QuotePreviewById = () => {

    const { agent, quote, configurations, handleClose, handleShow, show, setShow, setQuote, setAsDisabled, errors = [], setErrors, isLoading, navigate } = useContext(AgentContext)
    const { id } = useParams();
    const [order, setOrder] = useState({});

    const createOrder = () => {
        fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quote)
        })
            .then((r) => r.json())
            .then((data) => {
                // console.log(data);
                setShow(false);
                setOrder(data);
                fetch(`/api/quotes/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'closed', converted: 'Yes', order_id: data.id })
                })
                    .then((r) => r.json())
                    .then((data) => {
                        // console.log(data);
                        // Leaving off here
                    }
                    )
                // NEED TO UPDATE STATUS OF CONFIGURATIONS AND ACCESSORIES
                navigate(`/orders/${data.id}/confirmation`);
            });

    }

    const sendCustomerCopy = () => {

        const quoteCopy = { ...quote }
        let amt = 0;
        quoteCopy.screenconfigurations.map((configurator) => {
            configurator.description;
            configurator.formatted_unit_total = formatCurrency(configurator.list_price);
            amt += configurator.list_price;
        });
        quoteCopy.formatted_quote_total = formatCurrency(amt);


        fetch('/api/send-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quote: quoteCopy })
        })
            .then(response => response.json())
            .then(data => {
                alert('Customer Copy Sent')
            });
    }

    useEffect(() => {
        fetch(`/api/quotes/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                // console.log(data.customer)
                setQuote(data);
                setAsDisabled(true);
                setErrors(null);
            });
    }, [agent]);

    const salesReps = quote.account?.users || []
    // filter salesRep by id to get the salesRep phone number
    const salesRep = salesReps.filter((rep) => rep.id === quote.created_by) || null

    // get totals of all configurations
    const configurationstotal = (quote.screenconfigurations || []).reduce((acc, config) => {
        return acc + (config.list_price * quote.discount) * quote.markup_variable
    }, 0)

    // get totals of all accessory_add_ons
    const accessorytotal = (quote?.add_on_accessories || []).reduce((acc, accessory) => {
        return acc + accessory.prod_cost
    }, 0)

    // calculate shipping totals based on number of configurations
    const shippingtotal = (quote.screenconfigurations?.length || 0) * 185

    const [showModal, setShowModal] = useState(false);
    const [selectedRecipients, setSelectedRecipients] = useState([]);

    if (isLoading || !quote) {
        // console.log(quote)
        return <div> Loading ... </div>
    }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [preview, setPreview] = useState(true);  

    // Sample data for account users and customer (replace with real data)
    const accountUsers = quote?.account?.users || [];

    // console.log("aaaa", quote)
    // Filter to ensure current user isn't duplicated in account users
    const recipients = [quote.customer];

    return (
        <>
            {agent ? (
                quote ? (
                    <>
                        <Container>
                            <div className="account-details" >
                                <Card>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center">
                                            <h4 className='font-semibold'>Quote Details</h4>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Row>
                                            {!quote.quote_number ?
                                                'Loading' :
                                                <>
                                                    <Col md={6} sm={12}>
                                                        <h6><b>Quote Number:</b> <span className="text-gray-700">{quote.quote_number}</span></h6>
                                                        <h6><b>Date of Issue:</b> <span className="text-gray-700">{quote.created_at}</span></h6>
                                                        <h6><b>Customer Name:</b> <span className="text-gray-700">{quote.customer.first_name} {quote.customer.last_name}</span></h6>
                                                        <h6><b>Phone:</b> <span className="text-gray-700">{quote.customer.phone}</span></h6>
                                                        <h6><b>Email:</b> <span className="text-gray-700">{quote.customer.email}</span></h6>
                                                        <h6><b>Install Address:</b> <span className="text-gray-700">{quote.customer.address_1} {quote.customer.address_2} {quote.customer.city} {quote.customer.state} {quote.customer.zip_code}</span></h6>
                                                    </Col>
                                                    <Col className='font-xs' md={6} sm={12}>
                                                        <h6><b>Dealer Account:</b> <span className="text-gray-700">{quote.account.company_name}</span></h6>
                                                        <h6><b>Dealer Phone:</b> <span className="text-gray-700">{quote.account.phone}</span></h6>
                                                        <h6><b>Sales Rep:</b> <span className="text-gray-700">{salesRep.length > 0 ? (salesRep[0].first_name + ' ' + salesRep[0].last_name) : null}</span></h6>
                                                        <h6><b>Sales Rep Phone:</b> <span className="text-gray-700">{salesRep.length > 0 ? (salesRep[0].username) : null}</span></h6>
                                                        <h6><b>Sales Rep Email:</b> <span className="text-gray-700">{salesRep.length > 0 ? (salesRep[0].email) : null}</span></h6>
                                                        <h6><b>Status:</b> <span className="text-gray-700">{quote.status}</span></h6>
                                                    </Col>
                                                </>
                                            }
                                        </Row>
                                    </CardContent>
                                </Card>
                                <Row className='mt-3 mb-3'>
                                    <Col>
                                        <Card>
                                            <CardContent className="p-4">
                                                <ConfigurationsTable preview={preview}/>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>
                                {/* <Row className='mt-3 mb-3'>
                                    <Col>
                                        <Card>
                                            <CardContent className='p-4'>
                                                <AccessoriesTable quote={quote} fullDescription={true} />
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row> */}
                                <Row className="d-flex">
                                    <Col md={5} sm={12} className='d-flex mb-3'>
                                        <Card className="flex-grow-1">
                                            <CardContent>
                                                <CardTitle className="flex items-center pt-3">Notes</CardTitle>
                                                {quote.notes}
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col md={7} sm={12} className='d-flex mb-3'>
                                        <Card className="flex-grow-1">
                                            <CardTitle className="flex items-center p-6">Order Summary</CardTitle>
                                            <CardContent>
                                                <Row>
                                                    <Col xs={6}>
                                                        <h6><b>Configuration Totals:</b></h6>
                                                    </Col>
                                                    <Col className="text-end" xs={6}>
                                                        ${quote.sale_price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </Col>
                                                    {/* <Col xs={6}>
                                                        <h6><b>Accessory Totals:</b></h6>
                                                    </Col> */}
                                                    {/* <Col className="text-end" xs={6}>
                                                        ${accessorytotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </Col>
                                                    <Col xs={6}>
                                                        <h6><b>Miscellaneous Totals:</b></h6>
                                                    </Col>
                                                    <Col className="text-end" xs={6}>
                                                        $0.00
                                                    </Col> */}
                                                    <Col xs={6}>
                                                        <h6><b>Shipping:</b></h6>
                                                    </Col>
                                                    <Col className="text-end" xs={6}>
                                                        ${shippingtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </Col>
                                                    <Col xs={6}>
                                                        <h6><b>Grand Total:</b></h6>
                                                    </Col>
                                                    <Col className="text-end" xs={6}>
                                                        ${(quote.sale_price + shippingtotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </Col>
                                                </Row>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardContent className="p-6 pb-3">
                                                <Row >
                                                    <Col className='mb-2' xs={12} md={6}>
                                                        <Button className="w-full" variant="destructive" onClick={() => history.go(-1)}>Cancel</Button>
                                                    </Col>
                                                    {/* <Col className='mb-2' xs={12} md={4}>
                                                        <Button className="w-full" onClick={() => handleShowModal()}>Email Customer Copy</Button>
                                                    </Col> */}
                                                    <Col xs={12} md={6}>
                                                        <Button className="w-full" onClick={() => handleShow()}>Submit Quote for Order</Button>
                                                    </Col>
                                                </Row>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirming Order Submission</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>You're almost there! Please note once you submit your order the associated quote will archived and no longer editable.</Modal.Body>
                            <Modal.Footer>
                                <Container>
                                    <Row className='text-center'>
                                        <Col>
                                            <Button type='button' onClick={(handleClose, createOrder)}>
                                                Let's Go
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button type='button' onClick={handleClose}>
                                                Hold Please
                                            </Button>
                                        </Col>

                                    </Row>
                                </Container>
                            </Modal.Footer>
                        </Modal>
                        {quote.customer &&
                            <RecipientSelectionModal
                                show={showModal}
                                handleClose={handleCloseModal}
                                recipients={recipients}
                                selectedRecipients={selectedRecipients}
                                setSelectedRecipients={setSelectedRecipients}
                                isCustomer={true}
                            />
                        }
                    </>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That quote does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );


}

export default QuotePreviewById