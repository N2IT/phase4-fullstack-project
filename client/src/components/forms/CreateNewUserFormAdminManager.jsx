import { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateNewUserFormAdminManager = () => {

    const { agent, errors, setErrors, isLoading, setUser } = useContext(AgentContext);
    const { id } = useParams()

    const formSchema = yup.object().shape({
        first_name: yup.string().required("Please enter you first name."),
        last_name: yup.string().required("Please enter your last name."),
        email: yup.string().required("Please enter an email address."),
        username: yup.string().required("Must enter a username.").min(3),
        password: yup.string().required("Please enter a password.").min(12)
    })

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            account_id: "",
            status: true,
            created_by: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((response) => {
                    if (!response.ok) {
                        response.json().then((data) => {
                            setErrors(data.errors);
                        });
                    }
                    return response.json();
                })
                .then((user) => {
                    setUser(user);
                    history.go(-1)
                    alert(`User ${user.username} has been successfully created.`)
                })
        }
    })

    if (isLoading) {
        return <div> Loading ... </div>
    }

    return (
        <>
            <Container>
                <div className='account-details'>
                    <h2>Fill in new user details below:</h2>
                </div>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col md={6} sm={12} >
                                <Form.Label htmlFor="username">First Name </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.first_name}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.first_name} </p>
                                
                            </Col>
                            <Col>
                                <Form.Label htmlFor="username">Last Name </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    onChange={formik.handleChange}
                                    value={formik.values.last_name}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.last_name} </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12} >
                                <Form.Label htmlFor="username">Email </Form.Label>
                                <Form.Control
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.email} </p>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="username">Username </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />
                                <p style={{ color: 'red' }}> {formik.errors.username} </p>
                                {/* <br /> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12} >
                                <Form.Label htmlFor="password">Password </Form.Label>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </Col>
                            <Col>
                                <Form.Label htmlFor="role_id">Role &nbsp; </Form.Label>
                                <Form.Select id='role_id' name='role_id' onChange={formik.handleChange} value={formik.values.role_id}>
                                    <option value="" disabled defaultValue>Select a role</option>
                                    {agent.role_id === 1 ? <option value='1'>Admin</option> : null}
                                    <option value='2'>Manager</option>
                                    <option value='3'>Sales</option>
                                </Form.Select>
                                <p style={{ color: 'red' }}> {formik.errors.role_id} </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12} >
                                <Form.Label htmlFor="account_id">Account Id </Form.Label>
                                <Form.Control
                                    type="account_id"
                                    id="account_id"
                                    name="account_id"
                                    onChange={formik.handleChange}
                                    value={formik.values.account_id = id}
                                    disabled
                                />
                                <p style={{ color: 'red' }}> {formik.errors.password}</p>
                                {/* <Form.Label htmlFor="created_by">Created By </Form.Label> */}
                                <Form.Control
                                    id="created_by"
                                    name="created_by"
                                    onChange={formik.handleChange}
                                    value={formik.values.created_by = agent.id}
                                    disabled
                                    hidden
                                />
                                <p style={{ color: 'red' }}> {formik.errors.created_by} </p>
                            </Col>
                        </Row>
                        <p><Button type="submit">Submit</Button></p>
                    </Form>
                    <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </Container >
        </>
    )
}

export default CreateNewUserFormAdminManager