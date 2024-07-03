import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
import { AgentContext } from '../AgentProvider';
import CreateNewUserForm from '../components/CreateNewUserForm';
import InvalidCredentials from "../components/InvalidCredentials";
import Unauthorized from "../components/Unauthorized";

const AddUsersToAccount = () => {

    const { agent, setAccount, setErrors, setAsDisabled, account, isLoading, errors } = useContext(AgentContext);
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
    },[id,agent])

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

    if (agent.role_id === 1 ) {
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