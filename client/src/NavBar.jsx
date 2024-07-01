import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AgentContext } from './AgentProvider';

function NavBar() {
  const { agent, setAccountForm, setAgent, setValueId, valueId } = useContext(AgentContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (agent) {
      setExpanded(false);
      setValueId(agent.account_id)
    }
  }, [agent]);

  const handleLogoutClick = () => {
    fetch("/api/logout", {
      method: 'DELETE'
    })
      .then((r) => {
        if (r.ok) {
          setAgent(null);
          setAccountForm(true)
          navigate('/');
        }
      });
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <>
      {agent ? ( agent.role_id == 1 ? (
        <Navbar expanded={expanded} expand={false} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/">qp</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggle} />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              show={expanded}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  QuotePro
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <p>Welcome, {agent.username}!</p>
                  <Link to="/" onClick={handleClose}>Home</Link>
                  <Link to="/accounts" onClick={handleClose}>Accounts</Link>
                  <Link to="/users" onClick={handleClose}>Users</Link>
                  <Link to='/customers' onClick={handleClose}>Customers</Link>
                  <Link to="/quotes" onClick={handleClose}>Quotes</Link>
                  <Link to='/configurations' onClick={handleClose}>Configurations</Link>
                  <Link to="/support" onClick={handleClose}>Support</Link>
                  <hr />
                  <button onClick={handleLogoutClick}>Logout</button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ) : (
        <Navbar expanded={expanded} expand={false} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/">qp</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggle} />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              show={expanded}
              onHide={handleClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  QuotePro
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <p>Welcome, {agent.username}!</p>
                  <Link to="/" onClick={handleClose}>Home</Link>
                  <Link to={`/accounts/${valueId}`} onClick={handleClose}>My Account</Link>
                  {/* <Link to="/users" onClick={handleClose}>Users</Link> */}
                  <Link to={`/accounts/${valueId}/quotes`} onClick={handleClose}>My Quotes</Link>
                  <Link to="/new-quote" onClick={handleClose}>New Quote</Link>
                  <Link to ='/my-customers' onClick={handleClose}>My Customers</Link>
                  <Link to="/support" onClick={handleClose}>Support</Link>
                  <hr />
                  <button onClick={handleLogoutClick}>Logout</button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar> 
        ))  : null}
    </>
  );
}

export default NavBar;
