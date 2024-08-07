import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import CreateNewCustomerForm from "../components/forms/CreateNewCustomerForm"
import Unauthorized from "../components/Unauthorized";
import InvalidCredentials from "../components/InvalidCredentials";

const AccountIdAddCustomer = () => {

    const { agent, isLoading, setAccount, setAsDisabled, setErrors } = useContext(AgentContext);
    const { id } = useParams()

    useEffect(() => {
        fetch(`/api/accounts/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => { throw data; });
                }
                return response.json();
            })
            .then(data => {
                setAccount(data);
                setAsDisabled(true);
                setErrors(null);
            })
            .catch(error => {
                console.error('Errors:', error);
                setErrors([error.errors] || ['Unknown Error']);
                // setAccount(null);
                alert([error.errors])
                history.go(-1)
            });
        },[id])

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    if (agent.role_id === 1) {
        return (
            <div>
                <CreateNewCustomerForm />
            </div>
        );
    }

    if (agent.role_id !== 1 && agent.account_id.toString() === id) {
        return (
            <div>
                <CreateNewCustomerForm />
            </div>
        );

    }

    return (
        <div>
            <InvalidCredentials />
        </div>
    );

}

export default AccountIdAddCustomer