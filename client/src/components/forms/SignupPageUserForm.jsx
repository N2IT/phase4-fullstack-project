import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../../AgentProvider';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const SignupPageUserForm = () => {

    const { setAgent, account, errors, setErrors, navigate } = useContext(AgentContext);

    const formSchema = yup.object().shape({
        first_name: yup.string(),
        last_name: yup.string(),
        username: yup.string(),
        password: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            account_id: "",
            role_id: "",
            status: true,
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
                    setAgent(user);
                    navigate('/');
                })
        }
    })

    return (
        <>
            <Container>
                <div className='account-details'>
                    <h2>Now fill in your user details:</h2>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Label htmlFor="username">First Name </Form.Label>
                        <Form.Control
                            type="text"
                            id="first_name"
                            name="first_name"
                            onChange={formik.handleChange}
                            value={formik.values.first_name}
                        />
                        <p style={{ color: 'red' }}> {formik.errors.first_name} </p>
                        <Form.Label htmlFor="username">Last Name </Form.Label>
                        <Form.Control
                            type="text"
                            id="last_name"
                            name="last_name"
                            onChange={formik.handleChange}
                            value={formik.values.last_name}
                        />
                        <p style={{ color: 'red' }}> {formik.errors.last_name} </p>
                        <Form.Label htmlFor="username">Email </Form.Label>
                        <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <p style={{ color: 'red' }}> {formik.errors.email} </p>
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
                        <Form.Label htmlFor="password">Password </Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <p style={{ color: 'red' }}> {formik.errors.password}</p>

                        <Form.Label htmlFor="role_id">Role &nbsp; </Form.Label>
                        <Form.Select id='role_id' name='role_id' onChange={formik.handleChange} value={formik.values.role_id}>
                            <option value="" disabled defaultValue>Select a role</option>
                            <option value='1'>Admin</option>
                            <option value='2'>Manager</option>
                            <option value='3'>Sales</option>
                        </Form.Select>
                        <p style={{ color: 'red' }}> {formik.errors.role_id} </p>

                        <Form.Label htmlFor="account_id">Account Id </Form.Label>
                        <Form.Control
                            type="account_id"
                            id="account_id"
                            name="account_id"
                            onChange={formik.handleChange}
                            value={formik.values.account_id = account.id}
                            disabled
                        />
                        <p style={{ color: 'red' }}> {formik.errors.password}</p>
                        <Button variant='success' type="submit">Submit</Button>
                    </Form>
                    <p style={{ color: 'red' }}>{errors ? errors : null}</p>
                    {/* <Link to="#" >Forgot Password</Link> */}
                </div>
            </Container>
        </>
    )
}

export default SignupPageUserForm