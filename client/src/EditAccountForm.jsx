import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useOutletContext } from 'react-router-dom';

const EditAccountForm = ({ account, setAccount }) => {

    const [user, setUser, errors, setErrors, handleIdClick, valueId, setValueId] = useOutletContext()

    const formSchema = yup.object().shape({
        company_name: yup.string().required("A company name must be entered."),
        city: yup.string().required('Please enter the city where your company is located'),
        state: yup.string().required('Please enter the state where your company is located')
    })

    const formik = useFormik({
        initialValues: {
            account_number: `${account.account_number}`,
            company_name: `${account.company_name}`,
            address_1: `${account.address_1}`,
            address_2: `${account.address_2}`,
            city: `${account.city}`,
            state: `${account.state}`,
            zip_code: `${account.zip_code}`,
            phone: `${account.phone}`,
            discount: `${account.discount}`,
            markup_variable: `${account.markup_variable}`,
            created_at: `${account.created_at}`,
            updated_at: `${account.updated_at}`,
            status: true,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/accounts/${id}", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    { data.errors ? setErrors(data.errors) : setAccountForm() }
                })

        }
    })

    return (
        <>
            <div>
                <h2>Edit the company details below:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="account_number">Account Number </label>
                    <input
                        id="account_number"
                        name="account_number"
                        onChange={formik.handleChange}
                        value={formik.values.account_number}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.account_number} </p>
                    <label htmlFor="company_name">Company Name </label>
                    <input
                        id="company_name"
                        name="company_name"
                        onChange={formik.handleChange}
                        value={formik.values.company_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.company_name}</p>
                    <label htmlFor="city">City </label>
                    <input
                        id="city"
                        name="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.city} </p>
                    <label htmlFor="state">State </label>
                    <input
                        id="state"
                        name="state"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.state} </p>
                    <label htmlFor="address_1">Address 1 </label>
                    <input
                        id="address_1"
                        name="address_1"
                        onChange={formik.handleChange}
                        value={formik.values.address_1}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.address_1} </p>
                    <label htmlFor="address_2">Address 2 </label>
                    <input
                        id="address_2"
                        name="address_2"
                        onChange={formik.handleChange}
                        value={formik.values.address_2}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.address_2} </p>
                    <label htmlFor="zip_code">Zip Code </label>
                    <input
                        id="zip_code"
                        name="zip_code"
                        onChange={formik.handleChange}
                        value={formik.values.zip_code}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.zip_code} </p>
                    <label htmlFor="phone">Phone </label>
                    <input
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.phone} </p>
                    <label htmlFor="discount">Discount </label>
                    <input
                        id="discount"
                        name="discount"
                        onChange={formik.handleChange}
                        value={formik.values.discount}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                    <label htmlFor="markup_variable">Markup Variable </label>
                    <input
                        id="markup_variable"
                        name="markup_variable"
                        onChange={formik.handleChange}
                        value={formik.values.markup_variable}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.markup_variable} </p>
                    <label htmlFor="created_at">Created At </label>
                    <input
                        id="created_at"
                        name="created_at"
                        onChange={formik.handleChange}
                        value={formik.values.created_at}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.markup_variable} </p>
                    <label htmlFor="updated_at">Updated At </label>
                    <input
                        id="updated_at"
                        name="updated_at"
                        onChange={formik.handleChange}
                        value={formik.values.updated_at}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.updated_at} </p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default EditAccountForm