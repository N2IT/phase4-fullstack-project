import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

const AccountById = () => {

    const [ user, setUser, handleIdClick, valueId ] = useOutletContext()
    const {id} = useParams();
    const [account, setAccount] = useState(null)

    useEffect(() => {
        if (id) {
            fetch(`/api/accounts/${id}`)
                .then((r) => r.json())
                .then((data) => setAccount(data))
                .catch(error => console.error('Errors:', error));       
        }
    }, [id])

    return (
        <>
            { user ? (account ? account.account_number : 'Loading...') : <p>Lost pahtna</p>}
        </>
    )
}

export default AccountById