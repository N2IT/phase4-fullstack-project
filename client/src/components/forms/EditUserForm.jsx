import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AgentContext } from '../../AgentProvider';

const EditUserForm = ({ id }) => {

    const { user, errors, setErrors, disabled, handleEditClick, handleUpdateUser } = useContext(AgentContext);

    const [originalValues, setOriginalValues] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        account_id: '',
        company_name: '',
        created_at: '',
        updated_at: '',
        status: '',
        role_id: '',
    });

    useEffect(() => {
        if (user) {
            setOriginalValues({
                email: `${user.email}`,
                username: `${user.username}`,
                first_name: `${user.first_name}`,
                last_name: `${user.last_name}`,
                account_id: `${user.account.account_number}`,
                company_name: `${user.account.company_name}`,
                created_at: `${user.created_at}`,
                updated_at: `${user.updated_at}`,
                status: `${user.status}`,
                role_id: `${user.role_id}`,
            });
        }
    }, []);

    const formSchema = yup.object().shape({
        first_name: yup.string().required("Please enter you first name."),
        last_name: yup.string().required("Please enter your last name."),
        username: yup.string().required("Must enter a username.").min(3),
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

            fetch(`/api/users/${id}`, {
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
                        handleUpdateUser(data);
                        location.reload()
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
                            <label htmlFor="account_id">Account ID &nbsp; </label>
                            <br />
                            <input
                                id="account_id"
                                name="account_id"
                                onChange={formik.handleChange}
                                value={formik.values.account_id}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.account_id}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="company_name">Company Name &nbsp; </label>
                            <br />
                            <input
                                id="company_name"
                                name="company_name"
                                onChange={formik.handleChange}
                                value={formik.values.company_name}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.company_name} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="first_name">First Name &nbsp; </label>
                            <br />
                            <input
                                id="first_name"
                                name="first_name"
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.first_name} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="last_name">Last Name &nbsp; </label>
                            <br />
                            <input
                                id="last_name"
                                name="last_name"
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.last_name}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="username">Username &nbsp; </label>
                            <br />
                            <input
                                id="username"
                                name="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.username} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <label htmlFor="email">Email &nbsp; </label>
                            <br />
                            <input
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                disabled={disabled}
                            />
                            <p style={{ color: 'red' }}> {formik.errors.email} </p>
                        </Col>
                    </Row>
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
                        <Col>
                            <label htmlFor="role_id">Role &nbsp; </label>
                            <br />
                            <select id='role_id' name='role_id' onChange={formik.handleChange} value={formik.values.role_id} disabled>
                                <option value='1'>Admin</option>
                                <option value='2'>Manager</option>
                                <option value='3'>Sales</option>
                            </select>
                            <p style={{ color: 'red' }}> {formik.errors.role_id} </p>
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
                    </Row>
                    {disabled ?
                        <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Edit User </p> :
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

export default EditUserForm;


