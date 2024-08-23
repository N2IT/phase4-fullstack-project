import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InvalidCredentials from '../InvalidCredentials';
import Unauthorized from '../Unauthorized';
import { Form } from 'react-bootstrap';
import {Button} from 'react-bootstrap';


const CreateNewAccountFormAdmin = () => {

    const { agent, isLoading, setAccount, errors, navigate, setErrors } = useContext(AgentContext);


    const formSchema = yup.object().shape({
        company_name: yup.string().required("A company name must be entered"),
        address_1: yup.string().required("Please enter the address for your business"),
        city: yup.string().required('Please enter the city where your company is located'),
        state: yup.string().required('Please enter the state where your company is located'),
        zip_code: yup.string().required("Please enter a zip code for your business location"),
        phone: yup.string().required("Please enter a phone number for your business"),
    })

    const formik = useFormik({
        initialValues: {
            account_number: "",
            company_name: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            discount: "",
            zip_code: "",
            phone: "",
            created_by: "",
            status: true,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/accounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    { data.errors ? setErrors(data.errors) : (setAccount(data), navigate(`/accounts/${data.id}`)) }
                })

        }
    })

    if (isLoading) {
        return <div> Loading ... </div>
    }

    if (!agent) {
        return <Unauthorized />
    }

    if (agent.role_id !== 1) {
        return <InvalidCredentials />
    }

    return (
        <>
            <Container>
                <div className="account-details">
                    <Row>
                        <Col md={6} sm={12}>
                            <h2>Enter the company details:</h2>
                        </Col>
                        <Col md={6} sm={12}>
                            <button type="button" onClick={() => history.go(-1)}>Return to Prev. page</button>
                        </Col>
                    </Row>
                </div>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="account_id">Account Id </Form.Label>
                            <Form.Control
                                id="account_id"
                                name="account_id"
                                onChange={formik.handleChange}
                                placeholder='Generated on submission'
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.account_id}</p>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="company_name">Company Name </Form.Label>
                            <Form.Control
                                id="company_name"
                                name="company_name"
                                onChange={formik.handleChange}
                                value={formik.values.company_name}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.company_name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="address_1">Address Line 1 </Form.Label>
                            <Form.Control
                                id="address_1"
                                name="address_1"
                                onChange={formik.handleChange}
                                value={formik.values.address_1}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.address_1}</p>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="address_2">Address Line 2 </Form.Label>
                            <Form.Control
                                id="address_2"
                                name="address_2"
                                onChange={formik.handleChange}
                                value={formik.values.address_2}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.address_2} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="city">City </Form.Label>
                            <Form.Control
                                id="city"
                                name="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.city} </p>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="state">State </Form.Label>
                            <Form.Control
                                id="state"
                                name="state"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.state} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="zip_code">Zip Code </Form.Label>
                            <Form.Control
                                id="zip_code"
                                name="zip_code"
                                onChange={formik.handleChange}
                                value={formik.values.zip_code}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.zip_code} </p>
                        </Col>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="phone">Phone </Form.Label>
                            <Form.Control
                                id="phone"
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.phone} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6}>
                            <Form.Label htmlFor="discount">Discount </Form.Label>
                            <Form.Control
                                id="discount"
                                name="discount"
                                placeholder="Enter a whole number"
                                onChange={formik.handleChange}
                                value={formik.values.discount}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                        </Col>
                        <Col sm={12} md={6}>
                            {/* <Form.Label htmlFor="created_by">Created By </Form.Label> */}
                            <Form.Control
                                id="created_by"
                                name="created_by"
                                onChange={formik.handleChange}
                                value={formik.values.created_by = agent.id}
                                disabled
                                hidden
                            />
                            <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                        </Col>
                        <p><Button type="submit">Submit</Button></p>
                    </Row>
                </Form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </Container>
        </>
    )
}

export default CreateNewAccountFormAdmin