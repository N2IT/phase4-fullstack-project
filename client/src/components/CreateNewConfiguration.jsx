import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../AgentProvider';

const CreateNewConfiguration = () => {

    const { agent, setConfiguration, errors, setErrors, quote, navigate, onSubmitNewQuoteForm  } = useContext(AgentContext);

    // debugger

    const formSchema = yup.object().shape({
        sku: yup.string().required("Please enter the sku for the product to quote"),
        product_title: yup.string().required("Please provide product title"),
        product_description: yup.string().required('Please enter a product description'),
        cost: yup.string().required('Please enter the product cost'),
    })

    const formik = useFormik({
        initialValues: {
            sku: "",
            product_title: "",
            product_description: "",
            cost: "",
            quote_id: `${quote.id}`,
            created_by: `${agent.id}`,
            status: true,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/configurations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((res) => res.json()) 
                .then((data) => {
                    {data.errors ? setErrors(data.errors) : setConfiguration(data), onSubmitNewQuoteForm(), navigate(`/quotes/${quote.id}`)}
                })
                
        }
})
                    
    return (
        <>
            <div className="account-details">
                <h2>Configure your product:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="sku">SKU </label>
                    <input
                        id="sku"
                        name="sku"
                        onChange={formik.handleChange}
                        value={formik.values.sku}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.sku}</p>
                    <label htmlFor="product_title">Product Title </label>
                    <input
                        id="product_title"
                        name="product_title"
                        onChange={formik.handleChange}
                        value={formik.values.product_title}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.product_title}</p>
                    <label htmlFor="product_description">Product Description </label>
                    <input
                        id="product_description"
                        name="product_description"
                        onChange={formik.handleChange}
                        value={formik.values.product_description}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.product_description} </p>
                    <label htmlFor="cost">Cost </label>
                    <input
                        id="cost"
                        name="cost"
                        onChange={formik.handleChange}
                        value={formik.values.cost}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.cost} </p>
                    <label htmlFor="quote_id">Quote Id </label>
                    <input
                        id="quote_id"
                        name="quote_id"
                        onChange={formik.handleChange}
                        value={formik.values.quote_id}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.quote_id} </p>
                    <label htmlFor="created_by">Created By </label>
                    <input
                        id="created_by"
                        name="created_by"
                        onChange={formik.handleChange}
                        value={formik.values.created_by}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                    <label htmlFor="status">Status </label>
                    <input
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.status} </p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default CreateNewConfiguration