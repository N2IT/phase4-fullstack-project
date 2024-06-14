import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
const AgentContext = createContext();

const AgentProvider = ({ children }) => {

    const [agent, setAgent] = useState(null)
    const [accountForm, setAccountForm] = useState(true)
    const [accounts, setAccounts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [valueId, setValueId] = useState()
    const navigate = useNavigate()
    const [account, setAccount] = useState(null)
    const [errors, setErrors] = useState([])
    const [disabled, setAsDisabled] = useState(true)
    const [users, setUsers] = useState([])
    const [quotes, setQuotes] = useState([])
    const [user, setUser] = useState(null)

    const onSubmitAccountForm = () => {
        setAccountForm(!accountForm)
    }

    const handleEditClick = () => {
        setAsDisabled(!disabled)
    }

    const handleIdClick = (value) => {
        if (value.account_number) {
            navigate(`/accounts/${value.id}`)
        }
        else if (value.username) {
            navigate(`/users/${value.id}`)
        }
        else if (value.quote_number) {
            navigate(`/quotes/${value.id}`)
        }
    }

    // const handleUserIdClick = (value) => {
    //     setUser(value)
    //     navigate(`/users/${value.id}`)
    // }

    // const handleQuoteIdClick = (value) => {
    //     if (value.quote_number) {
    //         navigate(`/quotes/${value.id}`)
    //     }

        
    // }

    const handleUpdateAccount = (updatedAccount) => {
        const updatedAccountsArray = accounts.map(account => {
            if (account.id === updatedAccount.id)
                return updatedAccount
            else return account;
        });
        setAccounts(updatedAccountsArray);
        handleEditClick()
    }

    const handleUpdateUser = (updatedUser) => {
        const updatedUsersArray = users.map(user => {
            if (user.id === updatedUser.id)
                return updatedUser
            else return user;
        });
        setUsers(updatedUsersArray);
        handleEditClick()
    }

    useEffect(() => {
        fetch('/api/check-session')
            .then((r) => r.json())
            .then((agent) => {
                setAgent(agent)
                setIsLoading(false)
            })
            .catch(error => {
                console.error('Error fetching agent data:', error);
                setIsLoading(false);
            });
    }, [])

    return (
        <AgentContext.Provider value={
            {
                account,
                accounts,
                accountForm,
                agent,
                disabled,
                errors,
                handleEditClick,
                handleIdClick,
                handleUpdateAccount,
                handleUpdateUser,
                isLoading,
                navigate,
                onSubmitAccountForm,
                quotes,
                setAccount,
                setAccounts,
                setAccountForm,
                setAgent,
                setAsDisabled,
                setErrors,
                setIsLoading,
                setQuotes,
                setValueId,
                user,
                users,
                setUser,
                setUsers,
                valueId,
            }
        }> {children}</AgentContext.Provider>
    )

}

export { AgentContext, AgentProvider }