import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';

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
                    if (agent.role_id !== 1) {
                        navigate(`accounts/${agent.account_id}`);
                    }
                    else {
                        navigate('/')
                    }
                })
        },
    });

    return (
        <>
            <div>
                <h2>Enter your credentials below:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Username </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.username} </p>
                    <label htmlFor="password">Password </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.password}</p>
                    <button type="submit">Login</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default LoginForm