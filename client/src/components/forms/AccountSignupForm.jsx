import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';

const AccountSignupForm = () => {

    const { setAccount, setAccountForm, errors, setErrors } = useContext(AgentContext);


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
            <div className="account-details">
                <h2>First enter you company details:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="company_name">Company Name </label>
                    <input
                        id="company_name"
                        name="company_name"
                        onChange={formik.handleChange}
                        value={formik.values.company_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.company_name}</p>
                    <label htmlFor="address_1">Address Line 1 </label>
                    <input
                        id="address_1"
                        name="address_1"
                        onChange={formik.handleChange}
                        value={formik.values.address_1}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.address_1}</p>
                    <label htmlFor="address_2">Address Line 2 </label>
                    <input
                        id="address_2"
                        name="address_2"
                        onChange={formik.handleChange}
                        value={formik.values.address_2}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.address_2} </p>
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
                    {/* <label htmlFor="discount">Discount </label> */}
                    <input
                        id="discount"
                        name="discount"
                        placeholder="Enter a whole number"
                        onChange={formik.handleChange}
                        value={formik.values.discount}
                        hidden
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                <Link to="#" >Forgot Password</Link>
            </div>
        </>
    )
}

export default AccountSignupForm