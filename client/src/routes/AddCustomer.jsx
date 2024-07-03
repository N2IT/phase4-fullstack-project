import { useContext } from "react"
import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import CreateNewCustomerForm from "../components/CreateNewCustomerForm"
import InvalidCredentials from "../components/InvalidCredentials";

const AddCustomer = () => {

    const { agent, isLoading } = useContext(AgentContext);
    const { id } = useParams()

    debugger

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

export default AddCustomer