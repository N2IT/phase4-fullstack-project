import { useContext } from "react"
import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import CreateNewCustomerForm from "../components/CreateNewCustomerForm"
import InvalidCredentials from "../components/InvalidCredentials";

const AccountIdAddCustomer = () => {

    //LEAVING OFF HERE. REPEAT STEPS AS DONE PREVIOUSLY ON ADDUSERSTOACCOUNT TO PREVENT ADDING CUSTOMERS TO ACCOUNTS THAT DO NOT EXIST

    const { agent, isLoading, errors } = useContext(AgentContext);
    const { id } = useParams()

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!agent) {
        return (
            <Unauthorized />
        )
    }

    if (agent.role_id === 1 && errors) {
        alert('Cmon admin! You cant get away with that!')
        history.go(-1)
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