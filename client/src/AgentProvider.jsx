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
    const [quote, setQuote] = useState([])
    const [quotes, setQuotes] = useState([])
    const [user, setUser] = useState(null)
    const [updatedBy, setUpdatedBy] = useState()
    const [configurations, setConfigurations] = useState([])
    const [configuration, setConfiguration] = useState(null)

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
        else if (value.role_id) {
            navigate(`/users/${value.id}`)
        }
        else if (value.quote_number) {
            navigate(`/quotes/${value.id}`)
        }
        else if (value.sku) {
            navigate(`/configurations/${value.id}`)
        }
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

    const handleUpdateUser = (updatedUser) => {
        const updatedUsersArray = users.map(user => {
            if (user.id === updatedUser.id)
                return updatedUser
            else return user;
        });
        setUsers(updatedUsersArray);
        handleEditClick()
    }

    const handleUpdateQuote = (updatedQuote) => {
        const updatedQuotesArray = quotes.map(quote => {
            if (quote.id === updatedQuote.id)
                return updatedQuote
            else return quote;
        });
        setQuotes(updatedQuotesArray);
        handleEditClick()
    }

    const handleUpdateConfiguration = (updatedConfiguration) => {
        const updatedConfigurationsArray = configurations.map(configuration => {
            if (configuration.id === updatedConfiguration.id)
                return updatedConfiguration
            else return configuration;
        });
        setQuotes(updatedConfigurationsArray);
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
                configuration,
                configurations,
                disabled,
                errors,
                handleEditClick,
                handleIdClick,
                handleUpdateAccount,
                handleUpdateConfiguration,
                handleUpdateUser,
                handleUpdateQuote,
                isLoading,
                navigate,
                onSubmitAccountForm,
                quote,
                quotes,
                setAccount,
                setAccounts,
                setAccountForm,
                setAgent,
                setAsDisabled,
                setConfiguration,
                setConfigurations,
                setErrors,
                setIsLoading,
                setQuote,
                setQuotes,
                setUpdatedBy,
                setValueId,
                updatedBy,
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