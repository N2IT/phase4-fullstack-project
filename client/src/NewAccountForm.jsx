import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";

const NewAccountForm = ({ setAccountForm }) => {

    // const [accounts, setAccounts] = useState([]);
    const [errors, setErrors] = useState([])
    // const [refreshPage, setRefreshPage] = useState(false);

    // useEffect(() => {
    //     fetch("/api/accounts")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setAccounts(data);
    //             console.log(data);
    //         });
    // }, [setRefreshPage]);

    const formSchema = yup.object().shape({
        company_name: yup.string().required("A company name must be entered."),
        city: yup.string().required('Please enter the city where your company is located'),
        state: yup.string().required('Please enter the state where your company is located')
    })

    const formik = useFormik({
        initialValues: {
            account_number: "",
            company_name: "",
            // address_1: "",
            // address_2: "",
            city: "",
            state: "",
            // zip_code: "",
            // phone: "",
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
                    {data.errors ? setErrors(data.errors) : setAccountForm()}
                })
                
        }
})
                    


    return (
        <>
            <div>
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
                    <label htmlFor="account_number">City </label>
                    <input
                        id="city"
                        name="city"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.city} </p>
                    <label htmlFor="account_number">State </label>
                    <input
                        id="state"
                        name="state"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.state} </p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default NewAccountForm