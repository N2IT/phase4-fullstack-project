import Unauthorized from "../components/Unauthorized";
import CustomersTableByAccount from "../components/tables/CustomersTableByAccount";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from "../components/InvalidCredentials";

const CustomersByAccountId = () => {
    
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
    
    if (agent.role_id !== 1 && agent.account_id.toString() === id) {
        return (
            <div>
                <CustomersTableByAccount />
            </div>
        );

    }

    return (
        <div>
            <InvalidCredentials />
        </div>
    );

}

export default CustomersByAccountId