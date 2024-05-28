import { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import EditAccountForm from './EditAccountForm'

const AccountById = () => {

    const [user] = useOutletContext()
    const {id} = useParams();
    const [account, setAccount] = useState(null)

        useEffect(() => {
            if (id) {
                fetch(`/api/accounts/${id}`)
                    .then((r) => r.json())
                    .then((data) => setAccount(data))
                    .catch(error => console.error('Errors:', error));       
            }
        }, [user])

    

    return (
        <>
            {account ? <EditAccountForm id={id} account={account} setAccount={setAccount} /> : <p>You will need to login</p>}
            
        </>
    )
}

export default AccountById