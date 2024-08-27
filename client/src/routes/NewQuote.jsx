import { useContext, useEffect } from 'react'
import { AgentContext } from '../AgentProvider';
import Unauthorized from '../components/Unauthorized';
import NewQuoteCustomersTableByAccount from '../components/tables/NewQuoteCustomersTableByAccount';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const NewQuote = () => {

  const { agent, isLoading, account, setAccount, setIsLoading } = useContext(AgentContext)
  const { id } = useParams();

  if (isLoading) {
    return <div> Loading ... </div>
  }

  return (
    <>
      <div className="account-details">
        {agent ? (
          <>
            <Container>
              <h2>Get started with a new quote below.</h2>
              <p>Choose from existing customer:</p>
              <Card className='mb-3'>
                <Card.Body>
                  <NewQuoteCustomersTableByAccount />
                </Card.Body>
              </Card>
            </Container>
          </>
        ) :
          <Unauthorized />
        }
      </div>
    </>
  );
}

export default NewQuote;

