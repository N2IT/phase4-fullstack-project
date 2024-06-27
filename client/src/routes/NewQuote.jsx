
// import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react'
import { AgentContext } from '../AgentProvider';
import Unauthorized from '../components/Unauthorized';
import NewQuoteCustomersTableByAccount from '../components/NewQuoteCustomersTableByAccount';
// import { useEffect } from 'react';

const NewQuote = () => {

  const { agent, isLoading, customers, account } = useContext(AgentContext)
  
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

