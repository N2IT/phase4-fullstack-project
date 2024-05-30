import { useState, useEffect, createContext } from 'react';

const AgentContext = createContext();

const AgentProvider = ({ children }) => {
    
    const [agent, setAgent] = useState(null)
    const [accountForm, setAccountForm] = useState(true)

    const onSubmitAccountForm = () => {
        setAccountForm(!accountForm)
      }

    useEffect(() => {
        fetch('/api/check-session')
            .then((r) => r.json())
            .then((agent) => setAgent(agent))
    }, [])

    return (
        <AgentContext.Provider value = {{agent, setAgent, onSubmitAccountForm, accountForm, setAccountForm}}> {children}</AgentContext.Provider>
    )

}

export { AgentContext, AgentProvider}