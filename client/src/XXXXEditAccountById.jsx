import EditAccountForm from './EditAccountForm'

const EditAccountById = () => {
    return (
        <>
        { account ? <EditAccountForm /> : <p>'404 : Unathorized'</p> }
        </>
    )
}

export default EditAccountById