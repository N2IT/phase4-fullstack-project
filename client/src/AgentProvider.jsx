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

    const onSubmitAccountForm = () => {
        setAccountForm(!accountForm)
    }

    const handleEditClick = () => {
        setAsDisabled(!disabled)
    }

    const handleIdClick = (value) => {
        setValueId(value.id)
        navigate(`/accounts/${value.id}`)
    }

    const handleUpdateAccount = (updatedAccount) => {
        const updatedAccountsArray = accounts.map(account => {
            if (account.id === updatedAccount.id)
                return updatedAccount
            else return account;
        });
        setAccounts(updatedAccountsArray);
        handleEditClick()
    }

    useEffect(() => {
        fetch('/api/check-session')
            .then((r) => r.json())
            .then((agent) => setAgent(agent))
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
                isLoading,
                onSubmitAccountForm,
                setAccount,
                setAccounts,
                setAccountForm,
                setAgent,
                setAsDisabled,
                setErrors,
                setIsLoading,
                setValueId,
                valueId,
            }
        }> {children}</AgentContext.Provider>
    )

}

export { AgentContext, AgentProvider }