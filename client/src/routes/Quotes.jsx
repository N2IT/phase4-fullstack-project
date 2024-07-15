import { useEffect, useContext } from 'react';
import Unauthorized from '../components/Unauthorized';
import QuotesTable from '../components/tables/QuotesTable'
import { AgentContext } from '../AgentProvider';
import InvalidCredentials from '../components/InvalidCredentials';

const Quotes = () => {

  const { agent, isLoading, setQuotes, setIsLoading } = useContext(AgentContext);

  useEffect(() => {
    fetch('/api/quotes')
      .then((r) => r.json())
      .then((quote) => setQuotes(quote))
      .then(() => setIsLoading(false))
      .catch(error => console.error("Error:", error));
  
    localStorage.removeItem('account.id')
    localStorage.removeItem('account.discount')

  }, [])

  if (isLoading) {
    return <div> Loading ... </div>
  }

  return (
    <>
      <div className="account-details">
        {agent ? (agent.role_id === 1 ?
          <div>
            <h2>Quotes Table</h2>
            <QuotesTable />
          </div>
          : (
            <div>
              <InvalidCredentials />
            </div>
          )
        ) : (
          <div>
            <Unauthorized />
          </div>
        )

        }
      </div>
    </>
  );

}
export default Quotes;

