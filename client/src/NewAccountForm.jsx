import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'

const NewAccountForm = () => {

    const [accounts, setAccounts] = useState([]);
    const [errors, setErrors] = useState([])
    const [refreshPage, setRefreshPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/accounts")
            .then((res) => res.json())
            .then((data) => {
                setAccounts(data);
                console.log(data);
            });
    }, [setRefreshPage]);

    const formSchema = yup.object().shape({
        account_number: yup.number().positive("Must be a positive number").integer("Invalid entry.").required("Must enter an account number.").typeError("Please enter an integer."),
        company_name: yup.string().required("A company name must be entered.")
    })

    const formik = useFormik({
        initialValues: {
            account_number: "",
            company_name: "",
            // address_1: "",
            // address_2: "",
            // city: "",
            // state: "",
            // zip_code: "",
            // phone: "",
            // status: "",
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
                    {data.errors ? setErrors(data.errors) : navigate('/user-create')}
                })
                
                
        }
})
                    


    return (
        <>
            <div>
                <h2>Enter Company Account Details</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="account_number">Account Number </label>
                    <input
                        id="account_number"
                        name="account_number"
                        onChange={formik.handleChange}
                        value={formik.values.account_number}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.account_number} </p>
                    {/* <br /> */}
                    <label htmlFor="company_name">Company Name </label>
                    <input
                        id="company_name"
                        name="company_name"
                        onChange={formik.handleChange}
                        value={formik.values.company_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.company_name}</p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default NewAccountForm