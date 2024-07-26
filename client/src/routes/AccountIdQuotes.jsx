import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import QuotesTableByAccount from "../components/tables/QuotesTableByAccount";
import InvalidCredentials from "../components/InvalidCredentials";
import Unauthorized from "../components/Unauthorized";

const ViewQuotesByAccount = () => {

    const { agent, account, setAccount, setAsDisabled, setErrors } = useContext(AgentContext);
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
                setAccount(null);
            });
    }, [id]);

    if (!account) {
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
                <QuotesTableByAccount />
            </div>
        );
    }

    if (agent.role_id !== 1 && agent.account_id.toString() === id) {
        return (
            <div>
                <QuotesTableByAccount account={account}/>
            </div>
        );

    }

    return (
        <div>
            <InvalidCredentials />
        </div>
    );

}

export default ViewQuotesByAccount