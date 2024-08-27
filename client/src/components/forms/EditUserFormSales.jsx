import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
import { AgentContext } from '../../AgentProvider';

const EditUserFormSales = ({ id }) => {

    const { user, errors, setErrors, handleUpdateUser } = useContext(AgentContext);

    const [originalValues, setOriginalValues] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        account_id: '',
        company_name: '',
        created_at: '',
        updated_at: '',
        updated_by: '',
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
                updated_at: user.updated_at ? `${user.updated_at}` : "",
                updated_by: user.updated_by ? `${user.updated_by}` : "",
                status: `${user.status}`,
                role_id: `${user.role_id}`
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
                            <Form.Label htmlFor="account_id">Account ID &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="account_id"
                                name="account_id"
                                onChange={formik.handleChange}
                                value={formik.values.account_id}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.account_id}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="company_name">Company Name &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="company_name"
                                name="company_name"
                                onChange={formik.handleChange}
                                value={formik.values.company_name}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.company_name} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="status">Status &nbsp; </Form.Label>
                            <br />
                            <Form.Select id='status' name='status' onChange={formik.handleChange} value={formik.values.status} disabled>
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                            </Form.Select>

                            <p style={{ color: 'red' }}> {formik.errors.status} </p>
                        </Col>
                        <Col>
                            <Form.Label htmlFor="role_id">Role &nbsp; </Form.Label>
                            <br />
                            <Form.Select id='role_id' name='role_id' onChange={formik.handleChange} value={formik.values.role_id} disabled>
                                <option value='1'>Admin</option>
                                <option value='2'>Manager</option>
                                <option value='3'>Sales</option>
                            </Form.Select>
                            <p style={{ color: 'red' }}> {formik.errors.role_id} </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="first_name">First Name &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="first_name"
                                name="first_name"
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.first_name} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="last_name">Last Name &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="last_name"
                                name="last_name"
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.last_name}</p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="username">Username &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="username"
                                name="username"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.username} </p>
                        </Col>
                        <Col lg={3} md={6} xs={12}>
                            <Form.Label htmlFor="email">Email &nbsp; </Form.Label>
                            <br />
                            <Form.Control
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.email} </p>
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
                                value={formik.values.updated_by}
                                disabled
                            />
                            <p style={{ color: 'red' }}> {formik.errors.updated_by} </p>
                        </Col>
                    </Row>
                    {/* {disabled ?
                        <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Edit User </p> :
                        <>
                            <p><button type="submit">Save Changes</button></p>
                            <p className="view-btn" title="Edit Account" onClick={() => handleEditClick()}> Cancel </p>
                        </>
                    } */}
                </Form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </Container >
        </>
    );
};

export default EditUserFormSales;


