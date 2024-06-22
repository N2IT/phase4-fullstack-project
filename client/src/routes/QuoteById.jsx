import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditQuoteForm from '../components/EditQuoteForm';
// import SalesEditUserForm from '../components/SalesEditUserForm';
import Unauthorized from '../components/Unauthorized';
import { AgentContext } from '../AgentProvider';
import ConfigurationsTableByQuote from '../components/ConfigurationsTableByQuote';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const QuoteById = () => {
    const { agent, quote, setConfigurations, setQuote, setAsDisabled, errors = [], setErrors, isLoading } = useContext(AgentContext)
    const { id } = useParams();

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/quotes/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setQuote(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || 'Unknown Error');
                setQuote(null);
            });

        fetch('/api/configurations')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setConfigurations(data);
                setAsDisabled(true);
                // setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setConfigurations(null);
            });
    }, [id, agent, setQuote, setAsDisabled, setErrors]);

    if (isLoading) {
        return <div> Loading ... </div>
    }

    // if (agent.role_id === 1 && quote || agent.role_id === 2 && quote) {
    //     return (
    //         <div className='account-details'>
    //             <h2>Quote Details</h2>
    //             <EditQuoteForm id={id} />
    //         </div>
    //     );
    // }

    return (
        <>
            {agent ? (
                quote ? (
                    <>
                        <Container>
                            <div className='account-details'>

                                <Row>
                                    <Col md={6} xs={12}>
                                        <h2>Quote Details</h2>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <EditQuoteForm id={id} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ConfigurationsTableByQuote />
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

export default QuoteById