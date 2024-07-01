
// import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react'
import { AgentContext } from '../AgentProvider';
import Unauthorized from '../components/Unauthorized';
import NewQuoteCustomersTableByAccount from '../components/NewQuoteCustomersTableByAccount';
import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';

const NewQuote = () => {

  const { agent, isLoading, setAccount, setCustomers, setErrors, setAsDisabled } = useContext(AgentContext)
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
    fetch('/api/customers')
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => { throw data; });
        }
        return response.json();
      })
      .then(data => {
        setCustomers(data);
        setAsDisabled(true);
        // setErrors(null);
      })
      .catch(error => {
        console.error('Errors:', error);
        setErrors([error.errors] || ['Unknown Error']);
        setCustomers(null);
      });
  }, []);


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

