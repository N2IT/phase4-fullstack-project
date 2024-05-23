import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const AccountById = () => {

    const [user, setUser, handleIdClick, valueId] = useOutletContext()
    const [account, setAccount] = useState()

    useEffect(() => {
        if (valueId) {
            fetch(`/api/accounts/${valueId}`)
            .then((r) => r.json())
            .then((account) => console.log(account))
            .catch(error => console.error('Errors:', error));
        }
    },[valueId])
    
    return(
        <>
        {user ? `Here is where the ${account} detail will be` : <h3>Uh Oh</h3>
        }
    </>
    )
}

export default AccountById