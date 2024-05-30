import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import EditUserForm from './EditUserForm'
import Unauthorized from './Unauthorized';
import { AgentContext } from './AgentProvider';

const UserById = () => {
    const { agent, setUser, setAsDisabled } = useContext(AgentContext)

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`/api/users/${id}`)
                .then((r) => r.json())
                .then((data) => setUser(data))
                .then(() => setAsDisabled(true))
                .catch(error => console.error('Errors:', error));
        }
    }, [])

    return (
        <>
            {agent ?
                <div className='account-details'>
                    <h2>User Details</h2>
                    <p><EditUserForm id={id} /></p>
                </div> :
                <div>
                    <Unauthorized />
                </div>

            }
        </>
    )
}

export default UserById