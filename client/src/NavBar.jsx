// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleLogoutClick = () => {
        fetch("/api/logout", {
            method: 'DELETE'
        })
            .then((r) => {
                if (r.ok) {
                    setUser(null)
                    navigate('/')
                }
            })
    }

    return (
        <>
            {user ?
                ([false].map((expand) => (
                    <Navbar expanded={expanded} key={expand} expand={expand} className="bg-body-tertiary mb-3">
                        <Container fluid>
                            <Navbar.Brand href="/">qp</Navbar.Brand>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => setExpanded(expanded ? false : "expanded")}  />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end"
                            >
                                <Offcanvas.Header closeButton onClick={() => setExpanded(false)}>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        QuotePro
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3">
                                        <Link 
                                            to="/" 
                                            onClick={() => setExpanded(false)}
                                            >Home
                                        </Link>
                                        <Link 
                                            to="/accounts"
                                            onClick={() => setExpanded(false)}
                                            >Accounts
                                        </Link>
                                        <Link 
                                            to="/users"
                                            onClick={() => setExpanded(false)}
                                            >Users
                                        </Link>
                                        <Link 
                                            to="/quotes"
                                            onClick={() => setExpanded(false)}
                                            >Quotes
                                        </Link>
                                        <Link 
                                            to="/new-quote"
                                            onClick={() => setExpanded(false)}
                                            >New Quote
                                        </Link>
                                        <Link 
                                            to="/support"
                                            onClick={() => setExpanded(false)}
                                            >Support
                                        </Link>
                                        <hr />
                                        <button onClick={handleLogoutClick}>Logout</button>
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar >
                ))
                ) : null}
        </>
    );
}

export default NavBar;