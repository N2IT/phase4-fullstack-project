import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../../AgentProvider';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const EditCustomerForm = () => {

    const { agent, customer, errors, setErrors, disabled, setAsDisabled, handleEditClick, handleUpdateCustomer } = useContext(AgentContext);
    const { id } = useParams()

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
                address_1:`${customer.address_1}`,
                address_2:`${customer.address_2}`,
                city:`${customer.city}`,
                state:`${customer.state}`,
                zip_code:`${customer.zip_code}`,
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
                        setAsDisabled(!disabled)
                    }
                });
        }
    });

    return (
        <>
            <Container fluid>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        {/* <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="account_id">Account Id &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="account_id"
                                name="account_id"
                                onChange={formik.handleChange}
                                value={formik.values.account_id}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.account_id} </p>
                        </Col> */}
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="first_name">First Name &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="first_name"
                                name="first_name"
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.first_name}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="last_name">Last Name &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="last_name"
                                name="last_name"
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.last_name} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="email">Email &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.email} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="phone">Phone &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="phone"
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.phone}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} xs={12}>
                            <Form.Label htmlFor="address_1">Address Line 1 &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="address_1"
                                name="address_1"
                                onChange={formik.handleChange}
                                value={formik.values.address_1}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.address_1}</p>
                        </Col>
                        <Col md={6} xs={12}>
                            <Form.Label htmlFor="address_2">Address Line 2 &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="address_2"
                                name="address_2"
                                onChange={formik.handleChange}
                                value={formik.values.address_2}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.address_2}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={6} xs={12}>
                            <Form.Label htmlFor="city">City &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="city"
                                name="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.city}</p>
                        </Col>
                        <Col lg={4} md={6} xs={12}>
                            <Form.Label htmlFor="state">State &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="state"
                                name="state"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.state}</p>
                        </Col>
                        <Col lg={4} md={6} xs={12}>
                            <Form.Label htmlFor="zip_code">Zip Code &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="zip_code"
                                name="zip_code"
                                onChange={formik.handleChange}
                                value={formik.values.zip_code}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.zip_code}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="notes">Notes &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                as='textarea'
                                id="notes"
                                name="notes"
                                onChange={formik.handleChange}
                                value={formik.values.notes}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.notes} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="created_at">Created At &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="created_at"
                                name="created_at"
                                onChange={formik.handleChange}
                                value={formik.values.created_at}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.created_at} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="created_by">Created By &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="created_by"
                                name="created_by"
                                onChange={formik.handleChange}
                                value={formik.values.created_by}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="updated_at">Updated At &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="updated_at"
                                name="updated_at"
                                onChange={formik.handleChange}
                                value={formik.values.updated_at}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_at} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="updated_by">Updated By &nbsp; </Form.Label>
                            <br />
                            <Form.Control
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
                            <p><Button variant='primary' type="submit">Save Changes</Button></p>
                            <p className="view-btn" title="Cancel Edits" onClick={() => handleEditClick()}> Cancel </p>
                        </>
                    }
                </Form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </Container >
        </>
    );
};

export default EditCustomerForm;