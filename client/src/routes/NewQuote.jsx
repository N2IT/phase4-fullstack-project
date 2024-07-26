import { useContext, useEffect } from 'react'
import { AgentContext } from '../AgentProvider';
import Unauthorized from '../components/Unauthorized';
import NewQuoteCustomersTableByAccount from '../components/tables/NewQuoteCustomersTableByAccount';
import { useParams } from 'react-router-dom';

const NewQuote = () => {

  const { agent, isLoading, account, setAccount, setIsLoading } = useContext(AgentContext)
  const { id } = useParams();

  if (!account) {
    setIsLoading(true)
    useEffect(() => {
      fetch(`accounts/${id}`)
      .then((r) => r.json())
      .then(data => {
        setAccount(data)
      })
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));
    }, [agent])
  }

  if (isLoading) {
    return <div> Loading ... </div>
  }

  return (
    <>
      <div className="account-details">
        {agent ? (
          <>
            <h2>Get started with a new quote below.</h2>
            <p>Choose from existing customer:</p>
            <NewQuoteCustomersTableByAccount />
          </>
        ) :
          <Unauthorized />
        }
      </div>
    </>
  );
}

export default NewQuote;

