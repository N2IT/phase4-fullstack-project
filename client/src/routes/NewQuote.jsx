import { useContext, useEffect } from 'react'
import { AgentContext } from '../AgentProvider';
import Unauthorized from '../components/Unauthorized';
import NewQuoteCustomersTableByAccount from '../components/tables/NewQuoteCustomersTableByAccount';
import { useParams } from 'react-router-dom';

const NewQuote = () => {

  const { agent, account, setAccount, setErrors, setAsDisabled } = useContext(AgentContext)
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/accounts/${id}`)
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => { throw data; });
            }
            return response.json();
        })
        .then(data => {
            setAccount(data);
            setAsDisabled(true);
            setErrors(null);
        })
        .catch(error => {
            console.error('Errors:', error);
            setErrors([error.errors] || ['Unknown Error']);
            setAccount(null);
        });
}, [id]);

  if (!account) {
    return <div> Loading ... </div>
  }

  return (
    <>
      <div className="account-details">
        {agent ? (
          <>
            <h2>Get started with a new quote below.</h2>
            <p>Choose from existing customer:</p>
            <NewQuoteCustomersTableByAccount account={account} />
          </>
        ) :
          <Unauthorized />
        }
      </div>
    </>
  );
}

export default NewQuote;

