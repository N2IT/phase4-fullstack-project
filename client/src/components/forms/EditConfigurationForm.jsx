import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../../AgentProvider';

const EditConfigurationForm = ({ id }) => {

    const { agent, configuration, errors, setErrors, disabled, handleEditClick, handleUpdateConfiguration } = useContext(AgentContext);

    const [originalValues, setOriginalValues] = useState({
        sku: '',
        product_title: '',
        product_description: '',
        cost: '',
        quote_id: '',
        created_at: '',
        created_by: '',
        updated_at: '',
        updated_by: '',
        // status: ''
    });

    useEffect(() => {
        if (configuration) {
            setOriginalValues({
                sku: `${configuration.sku}`,
                product_title: `${configuration.product_title}`,
                product_description: `${configuration.product_description}`,
                cost: `${configuration.cost}`,
                quote_id: `${configuration.quote_id}`,
                created_at: `${configuration.created_at}`,
                created_by: `${configuration.created_by}`,
                updated_at: `${configuration.updated_at}`,
                updated_by: `${configuration.updated_by}`,
                // status: `${user.status}`,
            });
        }
    }, []);

    const formSchema = yup.object().shape({
        sku: yup.string().required('Please enter a sku.'),
        product_title: yup.string().required('Please enter a product title.'),
        product_description: yup.string().required('Please enter a product description'),
        cost: yup.string().required('Please enter a cost for the product.'),
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

            fetch(`/api/configurations/${id}`, {
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
                        handleUpdateConfiguration(data);
                    }
                });
        }
    });

    return (
        <>
            <Container fluid>
                <form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="sku">SKU &nbsp; </label>
                            <br />
                            <input
                                id="sku"
                                name="sku"
                                onChange={formik.handleChange}
                                value={formik.values.sku}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.sku} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="product_title">Product Title &nbsp; </label>
                            <br />
                            <input
                                id="product_title"
                                name="product_title"
                                onChange={formik.handleChange}
                                value={formik.values.product_title}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.product_title}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="product_description">Product Description &nbsp; </label>
                            <br />
                            <input
                                id="product_description"
                                name="product_description"
                                onChange={formik.handleChange}
                                value={formik.values.product_description}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.product_description} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="cost">Cost $&nbsp; </label>
                            <br />
                            <input
                                id="cost"
                                name="cost"
                                onChange={formik.handleChange}
                                value={formik.values.cost}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.cost} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="quote_id">Quote ID &nbsp; </label>
                            <br />
                            <input
                                id="quote_id"
                                name="quote_id"
                                onChange={formik.handleChange}
                                value={formik.values.quote_id}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.quote_id}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="created_by">Created By &nbsp; </label>
                            <br />
                            <input
                                id="created_by"
                                name="created_by"
                                onChange={formik.handleChange}
                                value={formik.values.created_by}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="created_at">Created At &nbsp; </label>
                            <br />
                            <input
                                id="created_at"
                                name="created_at"
                                onChange={formik.handleChange}
                                value={formik.values.created_at}
                                disabled
                            />  
                            <p style={{ color: 'red' }}> {formik.errors.status} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="updated_at">Updated At &nbsp; </label>
                            <br />
                            <input
                                id="updated_at"
                                name="updated_at"
                                onChange={formik.handleChange}
                                value={formik.values.updated_at}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_at} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="updated_by">Updated By &nbsp; </label>
                            <br />
                            <input
                                id="updated_by"
                                name="updated_by"
                                onChange={formik.handleChange}
                                value={originalValues.sku !== formik.values.sku
                                    || originalValues.product_title !== formik.values.product_title
                                    || originalValues.product_description !== formik.values.product_description
                                    || originalValues.cost !== formik.values.cost 
                                    ? formik.values.updated_by = agent.id : formik.values.updated_by
                                }
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_by} </p>
                        </Col>
                    </Row>
                    {disabled ?
                        <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Edit Configuration </p> :
                        <>
                            <p><button type="submit">Save Changes</button></p> 
                            <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Cancel </p>
                        </>
                    }
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </Container >
        </>
    );
};

export default EditConfigurationForm;