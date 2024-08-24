import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const LoginForm = () => {

    const { setAgent, errors, setErrors, navigate } = useContext(AgentContext);
    const formSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/login", {
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
                .then((agent) => {
                    setAgent(agent);
                    navigate('/');
                })
        },
    });

    return (
        <>
            <Container>
                <div>
                    <h2>Enter your credentials below:</h2>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Label htmlFor="username">Username </Form.Label>
                        <Form.Control
                            type="text"
                            id="username"
                            name="username"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                        <p style={{ color: 'red' }}> {formik.errors.username} </p>
                        <Form.Label htmlFor="password">Password </Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <p style={{ color: 'red' }}> {formik.errors.password}</p>
                        <Button variant='primary' type="submit">Login</Button>
                    </Form>
                    <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                </div>
            </Container>
        </>
    )
}

export default LoginForm