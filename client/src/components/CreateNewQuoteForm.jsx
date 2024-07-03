import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../AgentProvider';

const CreateNewQuoteForm = () => {

    const { agent, account, customer, errors, setErrors, setQuote, onSubmitNewQuoteForm } = useContext(AgentContext);

    const prevQuote = Math.floor(Math.random()*1000)

    const formSchema = yup.object().shape({
        title: yup.string().required("Please enter a title"),
        markup_variable: yup.string().required("Please enter you desired markup percentage for this quote.")
    })

    const formik = useFormik({
        initialValues: {
            quote_number: `${prevQuote}`,
            title: '',
            total_cost: '',
            discount: `${account.discount}`,
            savings: '',
            markup_variable: '',
            sale_price: '',
            margin_percentage: '',
            margin_dollars: '',
            notes: '',
            status: 'active',
            converted: '',
            created_at: '',
            created_by: `${agent.id}`,
            updated_at: '',
            updated_by: '',
            customer_id: `${customer.id}`,
            account_id: `${customer.account_id}`,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/quotes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json())
                .then((data) => {
                    { data.errors ? setErrors(data.errors) : setQuote(data), alert(`Quote ${data.quote_number} has succesfully been created.`), onSubmitNewQuoteForm() }
                })
        }
    })

    return (
        <>
            <div className="account-details">
                <h2>Let's initiate the quote here:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="quote_number">Quote Number </label>
                    <input
                        id="quote_number"
                        name="quote_number"
                        onChange={formik.handleChange}
                        value={formik.values.quote_number}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.quote_number}</p>
                    <label htmlFor="title">Title </label>
                    <input
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.title}</p>
                    <label htmlFor="notes">Notes </label>
                    <input
                        id="notes"
                        name="notes"
                        onChange={formik.handleChange}
                        value={formik.values.notes}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.notes}</p>
                    <label htmlFor="markup_variable">Markup Variable </label>
                    <input
                        id="markup_variable"
                        name="markup_variable"
                        onChange={formik.handleChange}
                        placeholder='Ex: 2.23'
                        value={formik.values.markup_variable}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.markup_variable} </p>
                    <label htmlFor="discount">Discount </label>
                    <input
                        id="discount"
                        name="discount"
                        onChange={formik.handleChange}
                        value={formik.values.discount}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                    <label htmlFor="status">Status </label>
                    <input
                        id="status"
                        name="status"
                        onChange={formik.handleChange} 
                        value={formik.values.status}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.status} </p>

                    <label htmlFor="converted">Converted </label>
                    <input
                        id="converted"
                        name="converted"
                        onChange={formik.handleChange} 
                        value={formik.values.converted = 'No'}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.converted} </p>
                    
                    <label htmlFor="created_by">Created By </label>
                    <input
                        id="created_by"
                        name="created_by"
                        onChange={formik.handleChange}                      
                        value={formik.values.created_by}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                    <label htmlFor="customer_id">Customer Id</label>
                    <input
                        id="customer_id"
                        name="customer_id"
                        onChange={formik.handleChange}                       
                        value={formik.values.customer_id}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.customer_id} </p>
                    <label htmlFor="account_id">Account Id </label>
                    <input
                        id="account_id"
                        name="account_id"
                        onChange={formik.handleChange}                       
                        value={formik.values.account_id}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.account_id} </p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default CreateNewQuoteForm