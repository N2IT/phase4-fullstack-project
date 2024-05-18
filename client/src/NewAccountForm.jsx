import { useFormik } from 'formik'

const NewAccountForm = () => {

    const formik = useFormik({
        initialValues: {
            account_number: "",
            company_name: "",
            // address_1: "",
            // address_2: "",
            // city: "",
            // state: "",
            // zip_code: "",
            // phone: "",
            // status: "",
        },
        validationSchema: formSchema,
    onSubmit: (values) => {
        fetch("accounts" , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(values, null, 2),
        }).then(
            (res) => {
                if (res.status == 200){
                    setRefreshPage(!refreshPage)
                }
            }
        )
    }
    })

    return (
        <>
            <div>
                <h2>Enter Company Account Details</h2>
                <form onSubmit={formik.handlesubmit} style={{ margin: "30px" }}>
                    <label htmlFor="account_number">Account Number</label>
                    <br />
                    <input
                        id="account_number"
                        name="account_number"
                        onChange={formik.handleChange}
                        value={formik.values.account_number}
                        />
                    <label htmlFor="company_name">Company Name</label>
                    <input
                        id="company_name"
                        name="company_name"
                        onChange={formik.values.company_name}
                        value={formik.values.company_name}
                        />
                </form>
            </div>
        </>
    )
}

export default NewAccountForm