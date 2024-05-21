import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'

const NewUserForm = () => {

    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([])
    const [refreshPage, setRefreshPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/accounts")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                console.log(data);
            });
    }, [setRefreshPage]);

    const formSchema = yup.object().shape({
        first_name: yup.string().required("Please enter you first name."),
        last_name: yup.string().required("Please enter your last name."), 
        username: yup.string().required("Must enter a username.").min(3),
        password: yup.string().required("Please enter a password.").min(12)
    })

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            account_id: "",
            // address_1: "",
            // address_2: "",
            // city: "",
            // state: "",
            // zip_code: "",
            // phone: "",
            status: true,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    {data.errors ? setErrors(data.errors) : navigate('/my-account')}
                })
                
        }
})
                    
    return (
        <>
            <div>
                <h2>Now fill in your user details:</h2>
                <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">First Name </label>
                    <input
                        id="first_name"
                        name="first_name"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.first_name} </p>
                    <label htmlFor="username">Last Name </label>
                    <input
                        id="last_name"
                        name="last_name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.last_name} </p>
                    <label htmlFor="username">Email </label>
                    <input
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.email} </p>
                    <label htmlFor="username">Username </label>
                    <input
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.username} </p>
                    {/* <br /> */}
                    <label htmlFor="password">Password </label>
                    <input
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.password}</p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default NewUserForm