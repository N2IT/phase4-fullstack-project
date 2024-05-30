import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate, useOutletContext } from 'react-router-dom'

const LoginForm = () => {

    const [agent, setAgent, user, setUser] = useOutletContext();
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();
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
            // .catch((error) => {
            //     console.error('Error during login:', error.message);
            //     setErrors({ api: error.message });
            // });
            // THIS CATCH ERROR WAS CAUSING MAJOR ISSUES.LEAVING FOR NOW AS REFERENCE
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