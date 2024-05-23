import { useEffect } from 'react';

const AccountById = () => {
    
    useEffect(() => {
        fetch('/api/accounts/:id')
        .then((r) => r.json())
        .then((data) => console.log(data))
        .catch((error) => console.log('error', error))
    },[])
    
    return(
        <h2>Here is where the account detail will be</h2>
    )
}

export default AccountById