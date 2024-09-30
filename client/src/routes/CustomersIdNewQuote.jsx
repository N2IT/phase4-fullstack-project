import CreateNewQuoteForm from "../components/forms/CreateNewQuoteForm";
import CreateNewConfiguration from "../components/forms/NewConfigFormReference";
import Unauthorized from "../components/Unauthorized";
import { useContext, useEffect } from "react";
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from "../components/InvalidCredentials";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Container } from "react-bootstrap";

const CustomersIdNewQuote = () => {

    const { agent, setCustomer, setAsDisabled, setErrors, customer, newQuotePageStatus, isLoading } = useContext(AgentContext);
    const { id } = useParams()

    useEffect(() => {
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
                setErrors([error.errors] || ['Unknown Error']);
                setCustomer(null);
            });
    }, [])

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    if (!customer) {
        return <div>Loading...</div>
    }

    if (agent.role_id === 1) {
        return (
            <div className='account-details'>
                <Container>
                    {newQuotePageStatus ?
                        <Card>
                            <Card.Body>
                                <CreateNewQuoteForm />
                            </Card.Body>
                        </Card>
                        :
                        <Card>
                            <Card.Body>
                                <CreateNewConfiguration />
                            </Card.Body>
                        </Card>}
                </Container>
            </div>
        );
    }

    if (agent.role_id !== 1 && agent.account_id === customer.account_id) {
        return (
            <div className='account-details'>
                <Container>
                    {newQuotePageStatus ?
                        <Card>
                            <Card.Body>
                                <CreateNewQuoteForm />
                            </Card.Body>
                        </Card>
                        :
                        <CreateNewConfiguration />
                    }
                </Container>
            </div>
        );
    }

    return (
        <div>
            <InvalidCredentials />
        </div>
    );
}

export default CustomersIdNewQuote