import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../../AgentProvider';

const EditAccountFormAdmin = ({ id }) => {
    const { agent, account, disabled, errors, setErrors, handleEditClick, handleUpdateAccount } = useContext(AgentContext)

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
        created_by: '',
        updated_at: '',
        updated_by: '',
        status: '',
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
                created_by: `${account.created_by}`,
                updated_at: account.updated_at ? `${account.updated_at}` : '',
                updated_by: account.updated_by ? `${account.updated_by}` : '',
                status: `${account.status}`,
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
                        // location.reload()
                    }
                });
        }
    });

    return (
        <>
            <Container>
                <form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="status">Status &nbsp; </label>
                            <br />
                            <select id='status' name='status' onChange={formik.handleChange} value={formik.values.status} disabled>
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                            </select>
                            <p style={{ color: 'red' }}> {formik.errors.status} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="account_number">Account Number &nbsp; </label>
                            <br />
                            <input
                                id="account_number"
                                name="account_number"
                                onChange={formik.handleChange}
                                value={formik.values.account_number}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.account_number} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="company_name">Company Name &nbsp; </label>
                            <br />
                            <input
                                id="company_name"
                                name="company_name"
                                onChange={formik.handleChange}
                                value={formik.values.company_name}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.company_name}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="discount">Discount % &nbsp; </label>
                            <br />
                            <input
                                id="discount"
                                name="discount"
                                onChange={formik.handleChange}
                                value={formik.values.discount}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.discount} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="phone">Phone &nbsp; </label>
                            <br />
                            <input
                                id="phone"
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.phone} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="city">City &nbsp; </label>
                            <br />
                            <input
                                id="city"
                                name="city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.city} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="state">State &nbsp; </label>
                            <br />
                            <input
                                id="state"
                                name="state"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.state} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="address_1">Address 1 &nbsp; </label>
                            <br />
                            <input
                                id="address_1"
                                name="address_1"
                                onChange={formik.handleChange}
                                value={formik.values.address_1}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.address_1} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="address_2">Address 2 &nbsp; </label>
                            <br />
                            <input
                                id="address_2"
                                name="address_2"
                                onChange={formik.handleChange}
                                value={formik.values.address_2}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.address_2} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="zip_code">Zip Code &nbsp; </label>
                            <br />
                            <input
                                id="zip_code"
                                name="zip_code"
                                onChange={formik.handleChange}
                                value={formik.values.zip_code}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.zip_code} </p>
                        </Col>
                    </Row>
                    <Row>
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
                            <p style={{ color: 'red' }}> {formik.errors.created_at} </p>
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
                                value={originalValues.company_name !== formik.values.company_name
                                    || originalValues.discount !== formik.values.discount
                                    || originalValues.phone !== formik.values.phone
                                    || originalValues.city !== formik.values.city
                                    || originalValues.state !== formik.values.state
                                    || originalValues.address_1 !== formik.values.address_1
                                    || originalValues.address_2 !== formik.values.address_2
                                    || originalValues.zip_code !== formik.values.zip_code
                                    || originalValues.status !== formik.values.status
                                    ? formik.values.updated_by = agent.id : formik.values.updated_by}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_by} </p>
                        </Col>
                    </Row>
                    {disabled ?
                        <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Edit Account </p> :
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

export default EditAccountFormAdmin;


