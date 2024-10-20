import { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import EditQuoteForm from '../components/forms/EditQuoteForm';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ConfigurationsTable from '../components/tables/ConfigurationsTable';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { formatCurrency, tksFormat } from '../lib/utils';
import RecipientSelectionModal from '../components/modal/RecipientSelectionModal';
import Confetti from 'react-confetti';
// import LoadingPage from '../components/sections/LoadingPage';

const OrderConfirmation = () => {
    const { agent, quote, handleClose, handleShow, show, setShow, setQuote, setAsDisabled, errors = [], setErrors, isLoading, navigate } = useContext(AgentContext)
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const location = useLocation();
    const isConfirmationPage = location.pathname.includes('confirmation');
    const [cookies, setCookie] = useCookies(['confettiShown8']);
    const [firstVisit, setFirstVisit] = useState(false);
    const [preview, setPreview] = useState(false);

    useEffect(() => {
        fetch(`/api/orders/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setOrder(data);
                setAsDisabled(true);
                setErrors(null);
                console.log('order in useEffect', order)
            });
    }, []);

    console.log('preview order-confirmation page', preview)
    const salesReps = order?.quote?.account?.users || []
    const salesRep = salesReps.filter((rep) => rep.id === order.quote.created_by) || null

    const configurationstotal = (order?.screenconfigurations || []).reduce((acc, config) => {
        return (acc + ((config.list_price * (1 - order.quote.discount)) * order.quote.markup_variable))
    }, 0)

    const accessorytotal = (order?.add_on_accessories || []).reduce((acc, accessory) => {
        return (acc + ((accessory.prod_cost * (1 - order.quote.discount)) * order.quote.markup_variable))
    }, 0)

    // calculate shipping totals based on number of configurations
    const shippingtotal = (order?.screenconfigurations?.length || 0) * 185

    const [showModal, setShowModal] = useState(false);
    const [selectedRecipients, setSelectedRecipients] = useState([]);

    // get 

    useEffect(() => {
        if (!cookies[`firstVisit_${id}`] && isConfirmationPage) {
            setFirstVisit(true);
            setTimeout(() => {
                setCookie(`firstVisit_${id}`, 'true', { path: '/' });
            }, 500); // 0.5 sec
        }
    }, []);

    // if (isLoading || !order) {
    //     return <LoadingPage />;
    // }

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const accountUsers = order?.quote?.account?.users || [];
    const recipients = [quote.customer];

    if (!order) {
        return <h2>Loading...</h2>
    }

    console.log(order)

    return (
        <>
            <div className='account-details'>
                        <>
                            {firstVisit && (
                                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                                    <Confetti
                                        width={window.innerWidth}
                                        height={window.innerHeight}
                                        recycle={false}
                                    />
                                    <h1 style={{ fontSize: '48px', color: '#4CAF50' }}>Nice Work!</h1>
                                    <p style={{ fontSize: '24px' }}>Your order has been submitted!</p>
                                </div>
                            )}
                            <Container>
                                <div className="my-3">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center">
                                                <h4 className='font-semibold'>Order Confirmation Details</h4>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <Row>
                                                {!order?.orderNumber ?
                                                    'Loading' :
                                                    <>
                                                        <Col md={6} sm={12}>
                                                            <h6><b>Order Number:</b> <span className="text-gray-700">{order.orderNumber}</span></h6>
                                                            <h6><b>Date of Issue:</b> <span className="text-gray-700">{order.orderDate}</span></h6>
                                                            <h6><b>Customer Name:</b> <span className="text-gray-700">{order?.customer?.first_name} {order?.customer?.last_name}</span></h6>
                                                            <h6><b>Phone:</b> <span className="text-gray-700">{order?.customer?.phone}</span></h6>
                                                            <h6><b>Email:</b> <span className="text-gray-700">{order?.customer?.email}</span></h6>
                                                            <h6><b>Install Address:</b> <span className="text-gray-700">{order.customer.address_1} {order.customer.address_2} {order.customer.city} {order.customer.state} {order.customer.zip_code}</span></h6>
                                                        </Col>
                                                        <Col className='font-xs' md={6} sm={12}>
                                                            <h6><b>Dealer Account:</b> <span className="text-gray-700">{order.account.company_name}</span></h6>
                                                            <h6><b>Dealer Phone:</b> <span className="text-gray-700">{order.account.phone}</span></h6>
                                                            <h6><b>Sales Rep:</b> <span className="text-gray-700">{salesRep.length > 0 ? (salesRep[0].first_name + ' ' + salesRep[0].last_name) : null}</span></h6>
                                                            <h6><b>Sales Rep Phone:</b> <span className="text-gray-700">{salesRep.length > 0 ? (salesRep[0].username) : null}</span></h6>
                                                            <h6><b>Sales Rep Email:</b> <span className="text-gray-700">{salesRep.length > 0 ? (salesRep[0].email) : null}</span></h6>
                                                            <h6><b>Status:</b> <span className="text-gray-700">{order.status}</span></h6>
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
                                                    <ConfigurationsTable order={quote} fullScreen={true} preview={true} />
                                                </CardContent>
                                            </Card>
                                        </Col>
                                    </Row>
                                    {/* <Row className='mt-3 mb-3'>
                                    <Col>
                                        <Card>
                                            <CardContent className='p-4'>
                                                <AccessoriesTable order={order} fullDescription={true} />
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
                                                            ${configurationstotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                        </Col>
                                                        {/* <Col xs={6}>
                                                        <h6><b>Accessory Totals:</b></h6>
                                                    </Col>
                                                    <Col className="text-end" xs={6}>
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
                                                            ${(configurationstotal + accessorytotal + shippingtotal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                                                        <Col className='mb-2' xs={12} md={4}>
                                                            <Button className="w-full" onClick={() => handleShowModal()}>Email Customer Copy</Button>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
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
            </div>
        </>
    );
}

export default OrderConfirmation;