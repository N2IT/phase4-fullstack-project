import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { AgentContext } from '../../AgentProvider';
import Container from 'react-bootstrap/Container';


const SignupPageAccountForm = () => {

    const { setAccount, setAccountForm, errors, setErrors } = useContext(AgentContext);


    const formSchema = yup.object().shape({
        company_name: yup.string(),
        address_1: yup.string(),
        city: yup.string(),
        state: yup.string(),
        zip_code: yup.string(),
        phone: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            account_number: "",
            company_name: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            discount: 10,
            zip_code: "",
            phone: "",
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
                    { data.errors ? setErrors(data.errors) : setAccountForm(), setAccount(data) }
                })

        }
    })

    return (
        <>
            <Container className='form-width'>
                <div className="account-details">
                    <h2>First enter you company details:</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <Form.Label htmlFor="company_name">Company Name </Form.Label>
                        <Form.Control
                            id="company_name"
                            name="company_name"
                            onChange={formik.handleChange}
                            value={formik.values.company_name}
                            required
                        />
                        <p style={{ color: 'red' }}> {formik.errors.company_name}</p>
                        <Form.Label htmlFor="address_1">Address Line 1 </Form.Label>
                        <Form.Control
                            id="address_1"
                            name="address_1"
                            onChange={formik.handleChange}
                            value={formik.values.address_1}
                            required
                        />
                        <p style={{ color: 'red' }}> {formik.errors.address_1}</p>
                        <Form.Label htmlFor="address_2">Address Line 2 </Form.Label>
                        <Form.Control
                            id="address_2"
                            name="address_2"
                            onChange={formik.handleChange}
                            value={formik.values.address_2}
                            
                        />
                        <p style={{ color: 'red' }}> {formik.errors.address_2} </p>
                        <Form.Label htmlFor="city">City </Form.Label>
                        <Form.Control
                            id="city"
                            name="city"
                            onChange={formik.handleChange}
                            value={formik.values.city}
                            required
                        />
                        <p style={{ color: 'red' }}> {formik.errors.city} </p>
                        <Form.Label htmlFor="state">State </Form.Label>
                        <Form.Control
                            id="state"
                            name="state"
                            onChange={formik.handleChange}
                            value={formik.values.state}
                            required
                        />
                        <p style={{ color: 'red' }}> {formik.errors.state} </p>
                        <Form.Label htmlFor="zip_code">Zip Code </Form.Label>
                        <Form.Control
                            id="zip_code"
                            name="zip_code"
                            onChange={formik.handleChange}
                            value={formik.values.zip_code}
                            required
                        />
                        <p style={{ color: 'red' }}> {formik.errors.zip_code} </p>
                        <Form.Label htmlFor="phone">Phone </Form.Label>
                        <Form.Control
                            id="phone"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            required
                        />
                        <p style={{ color: 'red' }}> {formik.errors.phone} </p>
                        {/* <Form.Label htmlFor="discount">Discount </Form.Label> */}
                        <Form.Control
                            id="discount"
                            name="discount"
                            placeholder="Enter a whole number"
                            onChange={formik.handleChange}
                            value={formik.values.discount}
                            hidden
                            disabled
                        />
                        <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                        <p><Button variant='secondary' type="submit">Submit</Button></p>
                    </form>
                    <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                    {/* <Link to="#" >Forgot Password</Link> */}
                </div>
            </Container>
        </>
    )
}

export default SignupPageAccountForm