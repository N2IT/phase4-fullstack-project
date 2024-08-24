import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../../AgentProvider';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const CreateNewQuoteForm = () => {

    const { agent, customer, errors, setErrors, setQuote, onSubmitNewQuoteForm } = useContext(AgentContext);
    const { id } = useParams()

    const prevQuote = Math.floor(Math.random() * 1000)

    const formSchema = yup.object().shape({
        title: yup.string().required("Please enter a title"),
        markup_variable: yup.string().required("Please enter you desired markup percentage for this quote.")
    })

    // debugger

    const formik = useFormik({
        initialValues: {
            quote_number: `${prevQuote}`,
            title: '',
            total_cost: '',
            discount: localStorage.length !== 0 ? `${localStorage.getItem('account.discount')}` : history.go(-1),
            // discount: `${acctDiscount}`,
            // savings: '',
            markup_variable: 1.5,
            // sale_price: '',
            // margin_percentage: '',
            // margin_dollars: '',
            notes: '',
            status: 'active',
            converted: '',
            created_at: '',
            created_by: `${agent.id}`,
            updated_at: '',
            updated_by: '',
            customer_id: `${id}`,
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
                    { data.errors ? setErrors(data.errors) : setQuote(data), alert(`Quote ${data.title} has succesfully been created.`), onSubmitNewQuoteForm() }
                })
        }
    })

    return (
        <>
            <Container className='form-width'>
                <div className="account-details">
                    <h2>Let's initiate the quote here:</h2>
                </div>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Label htmlFor="quote_number">Quote Number </Form.Label>
                    <Form.Control
                        id="quote_number"
                        name="quote_number"
                        onChange={formik.handleChange}
                        value={formik.values.quote_number}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.quote_number}</p>
                    <Form.Label htmlFor="discount" hidden>Discount </Form.Label>
                    <Form.Control
                        id="discount"
                        name="discount"
                        onChange={formik.handleChange}
                        value={formik.values.discount}
                        disabled
                        hidden
                    />
                    <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                    <Form.Label htmlFor="title">Title </Form.Label>
                    <Form.Control
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.title}</p>
                    <Form.Label htmlFor="markup_variable" hidden>Markup Variable </Form.Label>
                    <Form.Control
                        id="markup_variable"
                        name="markup_variable"
                        onChange={formik.handleChange}
                        value={formik.values.markup_variable}
                        disabled
                        hidden
                    />
                    <p style={{ color: 'red' }}> {formik.errors.markup_variable} </p>
                    <Form.Label htmlFor="notes">Notes </Form.Label>
                    <Form.Control
                        as='textarea'
                        id="notes"
                        name="notes"
                        onChange={formik.handleChange}
                        value={formik.values.notes}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.notes}</p>
                    <Form.Label htmlFor="status" hidden>Status </Form.Label>
                    <Form.Control
                        id="status"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                        disabled
                        hidden
                    />
                    <p style={{ color: 'red' }}> {formik.errors.status} </p>

                    <Form.Label htmlFor="converted" hidden>Converted </Form.Label>
                    <Form.Control
                        id="converted"
                        name="converted"
                        onChange={formik.handleChange}
                        value={formik.values.converted = 'No'}
                        disabled
                        hidden
                    />
                    <p style={{ color: 'red' }}> {formik.errors.converted} </p>

                    <Form.Label htmlFor="created_by" hidden>Created By </Form.Label>
                    <Form.Control
                        id="created_by"
                        name="created_by"
                        onChange={formik.handleChange}
                        value={formik.values.created_by}
                        disabled
                        hidden
                    />
                    <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                    <Form.Label htmlFor="customer_id" hidden>Customer Id</Form.Label>
                    <Form.Control
                        id="customer_id"
                        name="customer_id"
                        onChange={formik.handleChange}
                        value={formik.values.customer_id}
                        disabled
                        hidden
                    />
                    <p style={{ color: 'red' }}> {formik.errors.customer_id} </p>
                    <Form.Label htmlFor="account_id" hidden>Account Id </Form.Label>
                    <Form.Control
                        id="account_id"
                        name="account_id"
                        onChange={formik.handleChange}
                        value={formik.values.account_id}
                        disabled
                        hidden
                    />
                    <p style={{ color: 'red' }}> {formik.errors.account_id} </p>
                    <p><Button type="submit">Submit</Button></p>
                </Form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </Container>
        </>
    )
}

export default CreateNewQuoteForm