import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate, useOutletContext } from 'react-router-dom'

const LoginForm = () => {

    const [user, setUser] = useOutletContext();
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
            debugger
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then((r) => r.json())
            .then((user) => {
                {!user.ok ? setErrors(user.errors) : setUser(user), navigate('/my-account')}
            })
            
                // {!r.ok ? setErrors(r.errors) : r.son().then((user) => setUser(user))}
                // if (r.ok) {
                //   r.json()
                //   .then((user) => setUser(user));
                // }
                // setErrors()
            //   });
            }
        }
)

    return (
        <>
            <div>
                <h2>Enter your credentials below:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">Username </label>
                    <input
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.username} </p>
                    <label htmlFor="password">Password </label>
                    <input
                        id="password"
                        name="password"
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