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

    const onSubmitAccountForm = () => {
        setAccountForm(!accountForm)
      }

      const handleIdClick = (value) => {
        setValueId(value.id)
        navigate(`/accounts/${value.id}`)
      }
    
    

    useEffect(() => {
        fetch('/api/check-session')
            .then((r) => r.json())
            .then((agent) => setAgent(agent))
    }, [])

    return (
        <AgentContext.Provider value = {
            {
                accounts,
                accountForm,
                agent,
                handleIdClick,
                isLoading,
                onSubmitAccountForm, 
                setAccounts,
                setAccountForm,
                setAgent,
                setIsLoading,
                setValueId,
                valueId,             
            }
        }> {children}</AgentContext.Provider>
    )

}

export { AgentContext, AgentProvider}