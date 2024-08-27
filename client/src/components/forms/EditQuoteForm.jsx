import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { AgentContext } from '../../AgentProvider';

const EditQuoteForm = ({ id }) => {

    const { agent, quote, errors, setErrors, disabled, handleEditClick, handleUpdateQuote } = useContext(AgentContext);

    const [originalValues, setOriginalValues] = useState({
        quote_number: '',
        title: '',
        total_cost: '',
        discount: '',
        savings: '',
        markup_variable: '',
        sale_price: '',
        margin_percentage: '',
        margin_dollars: '',
        notes: '',
        status: '',
        converted: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: '',
        customer_id: '',
        account_id: '',
    });

    useEffect(() => {
        if (quote) {
            setOriginalValues({
                quote_number: `${quote.quote_number}`,
                title: `${quote.title}`,
                total_cost: quote.total_cost ? `${quote.total_cost}` : "0.00",
                discount: `${quote.discount}`,
                savings: quote.savings ? `${quote.savings}` : "",
                markup_variable: `${quote.markup_variable}`,
                sale_price: quote.sale_price ? `${quote.sale_price}` : "",
                margin_percentage: `${quote.margin_percentage}`,
                margin_dollars: quote.margin_dollars ? `${quote.margin_dollars}` : "",
                notes: `${quote.notes}`,
                status: `${quote.status}`,
                converted: `${quote.converted}`,
                created_at: `${quote.created_at}`,
                created_by: `${quote.created_by}`,
                updated_at: quote.updated_at ? `${quote.updated_at}` : "",
                updated_by: quote.updated_by ? `${quote.updated_by}` : "",
                customer_id: `${quote.customer_id}`,
                account_id: `${quote.account_id}`
            })
        }
    }, [quote]);

    const formSchema = yup.object().shape({
        quote_number: yup.string().required("Please enter a quote number."),
        title: yup.string().required("Please enter your a title"),
        discount: yup.string().required("Make sure a discount is included"),
        markup_variable: yup.string().required("Make sure to include your markup variable"),
        customer_id: yup.string().required("Make sure the customer id is included"),
        account_id: yup.string().required("Make sure the dealer account id is added to the quote")
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

            fetch(`/api/quotes/${id}`, {
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
                        handleUpdateQuote(data);

                    }
                });
        }
    });

    return (
        <>
            <Container fluid>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="quote_number">Quote Number &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="quote_number"
                                name="quote_number"
                                onChange={formik.handleChange}
                                value={formik.values.quote_number}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.quote_number} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="title">Title &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="title"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.title}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="markup_variable">Markup Variable &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="markup_variable"
                                name="markup_variable"
                                onChange={formik.handleChange}
                                value={formik.values.markup_variable}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.markup_variable}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                        <Row>
                            <Col md={6} xs={12}>
                                <Form.Label htmlFor="status">Status &nbsp; </Form.Label>
                                <br />
                                <Form.Select id='status' name='status' onChange={formik.handleChange} value={formik.values.status} disabled>
                                    <option value='active'>Active</option>
                                    <option value='inactive'>Inactive</option>
                                </Form.Select>

                                <p style={{ color: 'red' }}> {formik.errors.status} </p>
                            </Col>
                            <Col md={6} xs={12}>
                                <Form.Label htmlFor="converted">Converted &nbsp; </Form.Label>
                                <br />
                                <Form.Select id='converted' name='converted' onChange={formik.handleChange} value={formik.values.converted} disabled>
                                    <option value='Yes'>Yes</option>
                                    <option value='No'>No</option>
                                </Form.Select>

                                <p style={{ color: 'red' }}> {formik.errors.converted} </p>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="notes">Notes &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                as='textarea'
                                id="notes"
                                name="notes"
                                onChange={formik.handleChange}
                                value={formik.values.notes}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.notes}</p>
                        </Col>

                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="total_cost">Total Cost $&nbsp; </Form.Label>

                            <br />
                            <Form.Control
                                id="total_cost"
                                name="total_cost"
                                onChange={formik.handleChange}
                                value={parseFloat(formik.values.total_cost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.total_cost} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="discount">Discount %&nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="discount"
                                name="discount"
                                onChange={formik.handleChange}
                                value={(formik.values.discount * 100).toFixed(2)}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="savings">Savings $&nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="savings"
                                name="savings"
                                onChange={formik.handleChange}
                                value={(formik.values.total_cost * formik.values.discount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.savings}</p>
                        </Col>

                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="sale_price">Sale Price $&nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="sale_price"
                                name="sale_price"
                                onChange={formik.handleChange}
                                value={((formik.values.total_cost - formik.values.savings) * formik.values.markup_variable).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.sale_price}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="margin_percentage">Margin % &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="margin_percentage"
                                name="margin_percentage"
                                onChange={formik.handleChange}
                                value={formik.values.total_cost && formik.values.savings && formik.values.sale_price ? ((((formik.values.total_cost * formik.values.discount) * formik.values.markup_variable) - (formik.values.total_cost * formik.values.discount)) / (formik.values.total_cost * formik.values.discount) * 100).toFixed(2) : "0%"}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.margin_percentage}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="margin_dollars">Margin $ &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="margin_dollars"
                                name="margin_dollars"
                                onChange={formik.handleChange}
                                value={(((formik.values.total_cost * formik.values.discount) * formik.values.markup_variable) - (formik.values.total_cost * formik.values.discount)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.margin_dollars}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="created_at">Created At &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="created_at"
                                name="created_at"
                                onChange={formik.handleChange}
                                value={formik.values.created_at}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.created_at} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="created_by">Created By &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="created_by"
                                name="created_by"
                                onChange={formik.handleChange}
                                value={formik.values.created_by}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="updated_at">Updated At &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="updated_at"
                                name="updated_at"
                                onChange={formik.handleChange}
                                value={formik.values.updated_at}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_at} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="updated_by">Updated By &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="updated_by"
                                name="updated_by"
                                onChange={formik.handleChange}
                                value={originalValues.title !== formik.values.title
                                    || originalValues.markup_variable !== formik.values.markup_variable
                                    || originalValues.notes !== formik.values.notes
                                    || originalValues.status !== formik.values.status
                                    || originalValues.converted !== formik.values.converted
                                    ? formik.values.updated_by = agent.id : formik.values.updated_by}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_by} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="customer_id">Customer Id &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="customer_id"
                                name="customer_id"
                                onChange={formik.handleChange}
                                value={formik.values.customer_id}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.customer_id} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            {/* <Form.Label htmlFor="account_id">Account ID &nbsp; </Form.Label> */}
                            <br />
                            <Form.Control
                                id="account_id"
                                name="account_id"
                                onChange={formik.handleChange}
                                value={formik.values.account_id}
                                disabled
                                hidden
                            />
                            <p style={{ color: 'red' }}> {formik.errors.account_id} </p>
                        </Col>
                    </Row>
                    {disabled ?
                        <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Edit Quote Details </p> :
                        <>
                            <p><Button type="submit">Save Changes</Button></p>
                            <p className="view-btn" title="Cancel update" onClick={() => { handleEditClick(); setErrors(null) }}> Cancel </p>
                        </>
                    }
                </Form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </Container >
        </>
    );
};

export default EditQuoteForm;