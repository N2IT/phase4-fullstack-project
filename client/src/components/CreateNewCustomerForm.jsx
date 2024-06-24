import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InvalidCredentials from './InvalidCredentials';
import Unauthorized from './Unauthorized';
import { AgentContext } from '../AgentProvider';

const CreateNewCustomerForm = () => {

    const { account, agent, errors, setErrors, setCustomer } = useContext(AgentContext);

    // NEED TO SORT OUT WHY AGENT IS NOT PERSISTING ACROSS THIS COMPONENT AS WELL AS THE CREATE NEW USER

    const formSchema = yup.object().shape({
        first_name: yup.string().required('Please enter a first name.'),
        last_name: yup.string().required('Please enter last name.'),
        email: yup.string().required('Please enter an email address.'),
        phone: yup.string().required('Please enter a phone number.'),
    });

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            // address_1: "",
            // address_2: "",
            // city: "",
            // state: "",
            // zip_code: "",
            account_id: "",
            status: true,
            created_by: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((response) => {
                    if (!response.ok) {
                        response.json().then((data) => {
                            setErrors(data.errors);
                        });
                    }
                    return response.json();
                })
                .then((customer) => {
                    setCustomer(customer);
                    history.go(-1)
                    alert(`Customer ${customer.id} has been successfully created.`)
                })
        }
    })

    if (account === null) {
        return (
        <div className="account-details">
            <h2>Refreshing this form requires you to revisit the account page.</h2>
            <p><button className='button' onClick={() => history.go(-1)}>Return to Account Page</button></p>
        </div>
        )
    }

    if (agent.role_id === 1 && account || agent.role_id === 2 && account) {
        return (
            <>
                <Container fluid>
                    <div className="account-details">
                        <form onSubmit={formik.handleSubmit}>
                            <Row>
                                <Col>
                                    <label htmlFor="first_name">First Name &nbsp; </label>
                                    <br />
                                    <input
                                        id="first_name"
                                        name="first_name"
                                        onChange={formik.handleChange}
                                        value={formik.values.first_name}
                                    />
                                    <p style={{ color: 'red' }}> {formik.errors.first_name}</p>
                                </Col>
                                <Col>
                                    <label htmlFor="last_name">Last Name &nbsp; </label>
                                    <br />
                                    <input
                                        id="last_name"
                                        name="last_name"
                                        onChange={formik.handleChange}
                                        value={formik.values.last_name}
                                    />
                                    <p style={{ color: 'red' }}> {formik.errors.last_name} </p>
                                </Col>
                                <Col>
                                    <label htmlFor="email">Email &nbsp; </label>
                                    <br />
                                    <input
                                        id="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    <p style={{ color: 'red' }}> {formik.errors.email} </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="phone">Phone &nbsp; </label>
                                    <br />
                                    <input
                                        id="phone"
                                        name="phone"
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                    />
                                    <p style={{ color: 'red' }}> {formik.errors.phone}</p>
                                </Col>
                                <Col>
                                    <label htmlFor="notes">Notes &nbsp; </label>
                                    <br />
                                    <input
                                        id="notes"
                                        name="notes"
                                        onChange={formik.handleChange}
                                        value={formik.values.notes}
                                    />
                                    <p style={{ color: 'red' }}> {formik.errors.notes} </p>
                                </Col>
                                <Col>
                                    <label htmlFor="account_id">Account Id &nbsp; </label>
                                    <br />
                                    <input
                                        id="account_id"
                                        name="account_id"
                                        onChange={formik.handleChange}
                                        value={formik.values.account_id = account.id}
                                        disabled
                                    />
                                    <p style={{ color: 'red' }}> {formik.errors.account_id} </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="created_by">Created By &nbsp; </label>
                                    <br />
                                    <input
                                        id="created_by"
                                        name="created_by"
                                        onChange={formik.handleChange}
                                        value={formik.values.created_by = agent.id}
                                        disabled
                                    />
                                    <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                                </Col>
                            </Row>
                            <p><button type="submit">Submit</button></p>
                        </form>
                        <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                    </div>
                </Container >
            </>
        );
    }
    else if (agent.role_id === 3) {
        <InvalidCredentials />
    }
    else
        <Unauthorized />
};

export default CreateNewCustomerForm;