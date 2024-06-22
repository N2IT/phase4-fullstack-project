import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AgentContext } from '../AgentProvider';
import UsersTableByAccount from '../components/UsersTableByAccount';
import Unauthorized from '../components/Unauthorized';
import AdminEditAccountForm from '../components/AdminEditAccountForm';
import ManagerEditAccountForm from '../components/ManagerEditAccountForm';
import SalesEditAccountForm from '../components/SalesEditAccountForm';
import QuotesTableByAccount from '../components/QuotesTableByAccount';
// import DeleteModal from '../components/DeleteModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const AccountById = () => {
    const { agent, account, deleteAccountObject, isLoading, setQuotes, setAccount, setUsers, setAsDisabled, setErrors, errors } = useContext(AgentContext);
    const { id } = useParams();

    const handleDeleteClick = () => {
        fetch(`/api/accounts/${id}`, {
            method: 'DELETE',
        });

        deleteAccountObject(id)
    }

    useEffect(() => {
        if (!agent) {
            return;
        }

        fetch(`/api/accounts/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setAccount(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setAccount(null);
            });

        fetch('/api/users')
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setAsDisabled(true);
                // setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                setUsers(null);
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
    }, [id, agent, setQuotes, setAccount, setUsers, setAsDisabled, setErrors]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (agent.role_id === 1 && account) {
        return (
            <>
                <Container>
                    <div className='account-details'>
                        <Row>
                            <Col md={4} xs={12}>
                                <h2>Hello, admin:</h2>
                                <h3>Account Details</h3>
                            </Col>
                            <Col md={4} xs={12}>
                                <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                            </Col>
                            <Col md={4} xs={12}>
                                <button type="button" onClick={() => handleDeleteClick()}>Delete Account</button>
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
                    </div >
                </Container>
            </>
        );
    }

    if (agent.role_id === 2 && account) {
        return (
            <>
                <div className='account-details'>
                    <h2>Hello, manager:</h2>
                    <h3>Account Details</h3>
                    <ManagerEditAccountForm id={id} />
                </div>
                <div>
                    <UsersTableByAccount />
                </div>
            </>
        );
    }

    if (agent.role_id === 3 && account) {
        return (
            <>
                <div className='account-details'>
                    <h2>Hello, sales:</h2>
                    <h3>Account Details</h3>
                    <SalesEditAccountForm id={id} />
                </div>
                <div>
                    <UsersTableByAccount />
                </div>
            </>
        );
    }

    if (agent.role_id === null && account) {
        return (
            <div className='account-details'>
                <h2>Please contact your administrator to assign your role within the account.</h2>
            </div>
        );
    }

    return (
        <>
            {agent ? (
                account ? (
                    <div className='account-details'>
                        <h2>User Details</h2>
                        <SalesEditUserForm id={id} />
                    </div>
                ) : (
                    <div className='account-details'>
                        {Array.isArray(errors) && errors.length > 0 ? (
                            <h2>{errors[0]}</h2>
                        ) : (
                            <h2>That account does not exist.</h2>
                        )}
                    </div>
                )
            ) : (
                <Unauthorized />
            )}
        </>
    );
};

export default AccountById;
