import { useContext } from "react"
import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import CreateNewUserForm from '../components/CreateNewUserForm';
import InvalidCredentials from "../components/InvalidCredentials";
import Unauthorized from "../components/Unauthorized";

const AddUsersToAccount = () => {

    const { agent, isLoading } = useContext(AgentContext);
    const { id } = useParams()

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
                <CreateNewUserForm />
            </div>
        );
    }

    if (agent.role_id === 2 && agent.account_id.toString() === id) {
        return (
            <div>
                <CreateNewUserForm />
            </div>
        );

    }

    return (
        <div>
            <InvalidCredentials />
        </div>
    );

}

export default AddUsersToAccount