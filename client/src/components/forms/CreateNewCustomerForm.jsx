import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../../AgentProvider';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const CreateNewCustomerForm = () => {

    const { agent, errors, setErrors, setCustomer, newCustomerForQuote, setNewCustomerForQuote, navigate } = useContext(AgentContext);
    const { id } = useParams()

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
            notes: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            zip_code: "",
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
                    {
                        newCustomerForQuote ? (navigate(`customers/${customer.id}/new-quote`), setNewCustomerForQuote(false))
                            :
                            history.go(-1)
                        alert(`Customer ${customer.last_name}, ${customer.first_name} has been successfully created.`)
                    }
                })
        }
    })


    return (
        <>
            <Container className='form-width'>
                <div className="account-details">
                    <h2>Fill in new customer details below:</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col sm={6} xs={12}>
                                <Form.Label htmlFor="first_name">First Name &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="first_name"
                                    name="first_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.first_name}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.first_name}</p>
                            </Col>
                            <Col sm={6} xs={12}>
                                <Form.Label htmlFor="last_name">Last Name &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="last_name"
                                    name="last_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.last_name}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.last_name} </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} xs={12}>
                                <Form.Label htmlFor="email">Email &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.email} </p>
                            </Col>
                            <Col sm={6} xs={12}>
                                <Form.Label htmlFor="phone">Phone &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="phone"
                                    name="phone"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.phone}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={6} xs={12}>
                                <Form.Label htmlFor="address_1">Address Line 1 &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="address_1"
                                    name="address_1"
                                    onChange={formik.handleChange}
                                    value={formik.values.address_1}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.address_1}</p>
                            </Col>
                            <Col md={6} sm={6} xs={12}>
                                <Form.Label htmlFor="address_2">Address Line 2 &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="address_2"
                                    name="address_2"
                                    onChange={formik.handleChange}
                                    value={formik.values.address_2}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.address_2}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} sm={6} xs={12}>
                                <Form.Label htmlFor="city">City &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="city"
                                    name="city"
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.city}</p>
                            </Col>
                            <Col md={4} sm={6} xs={12}>
                                <Form.Label htmlFor="state">State &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="state"
                                    name="state"
                                    onChange={formik.handleChange}
                                    value={formik.values.state}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.state}</p>
                            </Col>
                            <Col md={4} sm={6} xs={12}>
                                <Form.Label htmlFor="zip_code">Zip Code &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="zip_code"
                                    name="zip_code"
                                    onChange={formik.handleChange}
                                    value={formik.values.zip_code}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.zip_code}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Label htmlFor="notes">Notes &nbsp; </Form.Label>
                                <Form.Control
                                    as='textarea'
                                    id="notes"
                                    name="notes"
                                    onChange={formik.handleChange}
                                    value={formik.values.notes}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.notes} </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} sm={6} xs={12}>
                                <Form.Label htmlFor="account_id">Account Id &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="account_id"
                                    name="account_id"
                                    onChange={formik.handleChange}
                                    value={formik.values.account_id = id}
                                    disabled
                                />
                                <p style={{ color: 'red' }}> {formik.errors.account_id} </p>
                            </Col>
                            <Col md={4} sm={6} xs={12}>
                                <Form.Label htmlFor="created_by">Created By &nbsp; </Form.Label>
                                <br />
                                <Form.Control
                                    id="created_by"
                                    name="created_by"
                                    onChange={formik.handleChange}
                                    value={formik.values.created_by = agent.id}
                                    disabled
                                />
                                <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                            </Col>
                        </Row>

                        <p><Button type="submit">Submit</Button></p>
                    </form>
                    <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                </div>
            </Container >
        </>
    );

};

export default CreateNewCustomerForm;