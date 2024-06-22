import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditCustomerForm from '../components/EditCustomerForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import QuoteTableByCustomer from '../components/QuoteTableByCustomer';

const CustomerById = () => {
    const { agent, customer, setCustomer, setAsDisabled, setQuotes, errors = [], setErrors, isLoading } = useContext(AgentContext)
    const { id } = useParams();

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/customers/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setCustomer(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setCustomer(null);
            });
        fetch('/api/quotes')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setQuotes(data);
                setAsDisabled(true);
                // setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setQuotes(null);
            });
    }, [id, agent, setQuotes, setCustomer, setAsDisabled, setErrors]);

    if (isLoading) {
        return <div> Loading ... </div>
    }

    return (
        <>
            {agent ? (
                customer ? (
                    <>
                        <Container>
                            <div className='account-details'>
                                <Row>
                                    <Col md={6} xs={12}>
                                        <h2>Customer Details</h2>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <EditCustomerForm id={id} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <QuoteTableByCustomer />
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That customer does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );


}

export default CustomerById