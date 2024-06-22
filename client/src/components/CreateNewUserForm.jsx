import { useContext }from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { AgentContext } from '../AgentProvider';

const CreateNewUserForm = () => {

    const { account, errors, setErrors, setUser }  = useContext(AgentContext);

    const formSchema = yup.object().shape({
        first_name: yup.string().required("Please enter you first name."),
        last_name: yup.string().required("Please enter your last name."),
        username: yup.string().required("Must enter a username.").min(3),
        password: yup.string().required("Please enter a password.").min(12)
    })

    const formik = useFormik({
        initialValues: {
            first_name: "Trevor",
            last_name: "No-A",
            email: "tnoa@tnoa.com",
            username: "tnoa",
            password: "twelvecharacters",
            account_id: "",
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
                    setUser(user);
                    history.go(-1)
                    alert(`User ${user.username} has been successfully created.`)
                })
        }
    })

    return (
        <>
            <div className='account-details'>
                <h2>Now fill in your user details:</h2>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">First Name </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.first_name} </p>
                    <label htmlFor="username">Last Name </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.last_name} </p>
                    <label htmlFor="username">Email </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.email} </p>
                    <label htmlFor="username">Username </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.username} </p>
                    {/* <br /> */}
                    <label htmlFor="password">Password </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p style={{ color: 'red' }}> {formik.errors.password}</p>
                    <label htmlFor="account_id">Account Id </label>
                    <input
                        type="account_id"
                        id="account_id"
                        name="account_id"
                        onChange={formik.handleChange}
                        value={formik.values.account_id = account.id}
                        disabled
                    />
                    <p style={{ color: 'red' }}> {formik.errors.password}</p>
                    <button type="submit">Submit</button>
                </form>
                <p style={{ color: 'red' }}>{errors ? errors : null}</p>
            </div>
        </>
    )
}

export default  CreateNewUserForm