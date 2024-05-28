// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as yup from "yup";
// import { useOutletContext } from 'react-router-dom';

// const EditAccountForm = ({ id, account, setAccount }) => {

//     const [user, setUser, accounts, setAccounts, accountForm, setAccountForm, onSubmitAccountForm, errors, setErrors, handleIdClick, valueId, setValueId, isLoading, setIsLoading, disabled, setAsDisabled, handleEditClick, handleUpdateAccount] = useOutletContext()
//     const [originalValues, setOriginalValues] = useState({})

//     const formSchema = yup.object().shape({
//         company_name: yup.string().required("A company name must be entered."),
//         city: yup.string().required('Please enter the city where your company is located'),
//         state: yup.string().required('Please enter the state where your company is located')
//     })

//     const formik = useFormik({
//         initialValues: {
//             account_number: `${account.account_number}`,
//             company_name: `${account.company_name}`,
//             address_1: `${account.address_1}`,
//             address_2: `${account.address_2}`,
//             city: `${account.city}`,
//             state: `${account.state}`,
//             zip_code: `${account.zip_code}`,
//             phone: `${account.phone}`,
//             discount: `${account.discount}`,
//             markup_variable: `${account.markup_variable}`,
//             created_at: `${account.created_at}`,
//             updated_at: `${account.updated_at}`,
//             status: true,
//         },
//         validationSchema: formSchema,
//         onSubmit: (values) => {
//             fetch(`/api/accounts/${id}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(values),
//             })
//                 .then((res) => res.json())
//                 .then((data) => {
//                     { data.errors ? setErrors(data.errors) : handleUpdateAccount(data) }
//                 })

//         }
//     })

//     return (
//         <>
//             <div>
//                 <h2>Edit the company details for account number {account.account_number} below:</h2>
//                 <form onSubmit={formik.handleSubmit}>
//                     <label htmlFor="account_number">Account Number </label>
//                     <input
//                         id="account_number"
//                         name="account_number"
//                         onChange={formik.handleChange}
//                         placeholder={account.account_number}
//                         value={formik.values.account_number}
//                         disabled
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.account_number} </p>
//                     <label htmlFor="company_name">Company Name </label>
//                     <input
//                         id="company_name"
//                         name="company_name"
//                         onChange={formik.handleChange}
//                         placeholder={account.company_name}
//                         value={formik.values.company_name}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.company_name}</p>
//                     <label htmlFor="city">City </label>
//                     <input
//                         id="city"
//                         name="city"
//                         onChange={formik.handleChange}
//                         value={formik.values.city}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.city} </p>
//                     <label htmlFor="state">State </label>
//                     <input
//                         id="state"
//                         name="state"
//                         onChange={formik.handleChange}
//                         value={formik.values.state}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.state} </p>
//                     <label htmlFor="address_1">Address 1 </label>
//                     <input
//                         id="address_1"
//                         name="address_1"
//                         onChange={formik.handleChange}
//                         value={formik.values.address_1}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.address_1} </p>
//                     <label htmlFor="address_2">Address 2 </label>
//                     <input
//                         id="address_2"
//                         name="address_2"
//                         onChange={formik.handleChange}
//                         value={formik.values.address_2}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.address_2} </p>
//                     <label htmlFor="zip_code">Zip Code </label>
//                     <input
//                         id="zip_code"
//                         name="zip_code"
//                         onChange={formik.handleChange}
//                         value={formik.values.zip_code}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.zip_code} </p>
//                     <label htmlFor="phone">Phone </label>
//                     <input
//                         id="phone"
//                         name="phone"
//                         onChange={formik.handleChange}
//                         value={formik.values.phone}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.phone} </p>
//                     <label htmlFor="discount">Discount </label>
//                     <input
//                         id="discount"
//                         name="discount"
//                         onChange={formik.handleChange}
//                         value={formik.values.discount}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.discount} </p>
//                     <label htmlFor="markup_variable">Markup Variable </label>
//                     <input
//                         id="markup_variable"
//                         name="markup_variable"
//                         onChange={formik.handleChange}
//                         value={formik.values.markup_variable}
//                         disabled = {disabled}
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.markup_variable} </p>
//                     <label htmlFor="created_at">Created At </label>
//                     <input
//                         id="created_at"
//                         name="created_at"
//                         onChange={formik.handleChange}
//                         value={formik.values.created_at}
//                         disabled
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.markup_variable} </p>
//                     <label htmlFor="updated_at">Updated At </label>
//                     <input
//                         id="updated_at"
//                         name="updated_at"
//                         onChange={formik.handleChange}
//                         value={formik.values.updated_at}
//                         disabled
//                     />
//                     <p style={{ color: 'red' }}> {formik.errors.updated_at} </p>
//                     { disabled ? 
//                         <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Edit Account </p> :
//                         <>
//                         <button type="submit">Save Changes</button>, <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Cancel </p>
//                         </>
//                         }
                    
//                 </form>
//                 <p style={{ color: 'red' }}>{errors ? errors : null}</p>
//             </div>
//         </>
//     )
// }

// export default EditAccountForm

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useOutletContext } from 'react-router-dom';

const EditAccountForm = ({ id, account, setAccount }) => {
    const [user, setUser, accounts, setAccounts, accountForm, setAccountForm, onSubmitAccountForm, errors, setErrors, handleIdClick, valueId, setValueId, isLoading, setIsLoading, disabled, setAsDisabled, handleEditClick, handleUpdateAccount] = useOutletContext();

    const [originalValues, setOriginalValues] = useState({
        account_number: '',
        company_name: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        zip_code: '',
        phone: '',
        discount: '',
        markup_variable: '',
        created_at: '',
        updated_at: '',
        status: true,
    });

    useEffect(() => {
        if (account) {
            setOriginalValues({
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
            });
        }
    }, [account]);

    const formSchema = yup.object().shape({
        company_name: yup.string().required("A company name must be entered."),
        city: yup.string().required('Please enter the city where your company is located'),
        state: yup.string().required('Please enter the state where your company is located')
    });

    const formik = useFormik({
        initialValues: originalValues,
        enableReinitialize: true,
        validationSchema: formSchema,
        onSubmit: (values) => {
            const changes = {};
            Object.keys(values).forEach(key => {
                if (values[key] !== originalValues[key]) {
                    changes[key] = values[key];
                }
            });

            fetch(`/api/accounts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(changes),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.errors) {
                        setErrors(data.errors);
                    } else {
                        handleUpdateAccount(data);
                    }
                });
        }
    });

    return (
        <>
            <div>
                <h2>Edit the company details for account number {account.account_number} below:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="account_number">Account Number </label>
                    <input
                        id="account_number"
                        name="account_number"
                        onChange={formik.handleChange}
                        placeholder={account.account_number}
                        value={formik.values.account_number}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.account_number} </p>
                    <label htmlFor="company_name">Company Name </label>
                    <input
                        id="company_name"
                        name="company_name"
                        onChange={formik.handleChange}
                        placeholder={account.company_name}
                        value={formik.values.company_name}
                        disabled={disabled}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.company_name}</p>
                    <label htmlFor="city">City </label>
                    <input
                        id="city"
                        name="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        disabled={disabled}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.city} </p>
                    <label htmlFor="state">State </label>
                    <input
                        id="state"
                        name="state"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                        disabled={disabled}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.state} </p>
                    <label htmlFor="address_1">Address 1 </label>
                    <input
                        id="address_1"
                        name="address_1"
                        onChange={formik.handleChange}
                        value={formik.values.address_1}
                        disabled={disabled}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.address_1} </p>
                    <label htmlFor="address_2">Address 2 </label>
                    <input
                        id="address_2"
                        name="address_2"
                        onChange={formik.handleChange}
                        value={formik.values.address_2}
                        disabled={disabled}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.address_2} </p>
                    <label htmlFor="zip_code">Zip Code </label>
                    <input
                        id="zip_code"
                        name="zip_code"
                        onChange={formik.handleChange}
                        value={formik.values.zip_code}
                        disabled={disabled}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.zip_code} </p>
                    <label htmlFor="phone">Phone </label>
                    <input
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        disabled={disabled}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.phone} </p>
                    <label htmlFor="discount">Discount </label>
                    <input
                        id="discount"
                        name="discount"
                        onChange={formik.handleChange}
                        value={formik.values.discount}
                        disabled={disabled}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                    <label htmlFor="markup_variable">Markup Variable </label>
                    <input
                        id="markup_variable"
                        name="markup_variable"
                        onChange={formik.handleChange}
                        value={formik.values.markup_variable}
                        disabled={disabled}
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
                    <p style={{ color: 'red' }}> {formik.errors.created_at} </p>
                    <label htmlFor="updated_at">Updated At </label>
                    <input
                        id="updated_at"
                        name="updated_at"
                        onChange={formik.handleChange}
                        value={formik.values.updated_at}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.updated_at} </p>
                    { disabled ? 
                        <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Edit Account </p> :
                        <>
                        <button type="submit">Save Changes</button>, <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Cancel </p>
                        </>
                    }
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    );
};

export default EditAccountForm;


