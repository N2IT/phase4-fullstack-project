import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../AgentProvider';

const EditCustomerForm = ({ id }) => {

    const { agent, customer, errors, setErrors, disabled, handleEditClick, handleUpdateCustomer } = useContext(AgentContext);

    const [originalValues, setOriginalValues] = useState({
        // status: ''
    });

    useEffect(() => {
        if (customer) {
            setOriginalValues({
                account_id: `${customer.account_id}`,
                first_name: `${customer.first_name}`,
                last_name: `${customer.last_name}`,
                email: `${customer.email}`,
                phone: `${customer.phone}`,
                notes: `${customer.notes}`,
                created_at: `${customer.created_at}`,
                created_by: `${customer.created_by}`,
                updated_at: updated_at ? `${customer.updated_at}` : "",
                updated_by: updated_by ? `${customer.updated_by}` : "",
                // status: `${user.status}`,
            });
        }
    }, []);

    const formSchema = yup.object().shape({
        first_name: yup.string().required('Please enter a first name.'),
        last_name: yup.string().required('Please enter last name.'),
        email: yup.string().required('Please enter an email address.'),
        phone: yup.string().required('Please enter a phone number.'),
    });

    const formik = useFormik({
        initialValues: originalValues,
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values) => {
            const changes = {};
            Object.keys(values).forEach(key => {
                if (values[key] !== originalValues[key]) {
                    changes[key] = values[key];
                }
            });

            fetch(`/api/customers/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(changes),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.errors) {
                        setErrors(data.errors);
                    } else {
                        handleUpdateCustomer(data);
                    }
                });
        }
    });

    return (
        <>
            <Container fluid>
                <form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="account_id">Account Id &nbsp; </label>
                            <br />
                            <input
                                id="account_id"
                                name="account_id"
                                onChange={formik.handleChange}
                                value={formik.values.account_id}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.account_id} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="first_name">First Name &nbsp; </label>
                            <br />
                            <input
                                id="first_name"
                                name="first_name"
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.first_name}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="last_name">Last Name &nbsp; </label>
                            <br />
                            <input
                                id="last_name"
                                name="last_name"
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.last_name} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="email">Email &nbsp; </label>
                            <br />
                            <input
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.email} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="phone">Phone &nbsp; </label>
                            <br />
                            <input
                                id="phone"
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.phone}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="notes">Notes &nbsp; </label>
                            <br />
                            <input
                                id="notes"
                                name="notes"
                                onChange={formik.handleChange}
                                value={formik.values.notes}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.notes} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="created_at">Created At &nbsp; </label>
                            <br />
                            <input
                                id="created_at"
                                name="created_at"
                                onChange={formik.handleChange}
                                value={formik.values.created_at}
                                disabled
                            />                                
                            <p style={{ color: 'red' }}> {formik.errors.created_at} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="created_by">Created By &nbsp; </label>
                            <br />
                            <input
                                id="created_by"
                                name="created_by"
                                onChange={formik.handleChange}
                                value={formik.values.created_by}
                                disabled
                            />                                
                            <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="updated_at">Updated At &nbsp; </label>
                            <br />
                            <input
                                id="updated_at"
                                name="updated_at"
                                onChange={formik.handleChange}
                                value={formik.values.updated_at}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_at} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="updated_by">Updated By &nbsp; </label>
                            <br />
                            <input
                                id="updated_by"
                                name="updated_by"
                                onChange={formik.handleChange}
                                value={originalValues.first_name !== formik.values.first_name
                                    || originalValues.last_name !== formik.values.last_name
                                    || originalValues.email !== formik.values.email
                                    || originalValues.phone !== formik.values.phone
                                    || originalValues.notes !== formik.values.notes
                                    ? formik.values.updated_by = agent.id : formik.values.updated_by
                                }
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_by} </p>
                        </Col>
                    </Row>
                    {disabled ?
                        <p className="view-btn" title="Edit Customer" onClick={() => handleEditClick()}> Edit Customer </p> :
                        <>
                            <p><button type="submit">Save Changes</button></p> 
                            <p className="view-btn" title="Cancel Edits" onClick={() => handleEditClick()}> Cancel </p>
                        </>
                    }
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </Container >
        </>
    );
};

export default EditCustomerForm;