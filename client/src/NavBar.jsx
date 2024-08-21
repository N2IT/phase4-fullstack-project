import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ButtonMailto from './components/ButtonMailTo';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AgentContext } from './AgentProvider';
import {
  CircleUser,
  Menu,
  Package2,
} from "lucide-react"
import { Button } from "./components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet"


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
          localStorage.removeItem('account.id')
          localStorage.removeItem('account.discount')
          // localStorage.clear()
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
    //   <>
    //     {agent ? ( agent.role_id == 1 ? (
    //       <Navbar expanded={expanded} expand={false} className="bg-body-tertiary mb-3">
    //         <Container fluid>
    //           <Navbar.Brand href="/">qp</Navbar.Brand>
    //           <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggle} />
    //           <Navbar.Offcanvas
    //             id="offcanvasNavbar"
    //             aria-labelledby="offcanvasNavbarLabel"
    //             placement="end"
    //             show={expanded}
    //             onHide={handleClose}
    //           >
    //             <Offcanvas.Header closeButton>
    //               <Offcanvas.Title id="offcanvasNavbarLabel">
    //                 QuotePro
    //               </Offcanvas.Title>
    //             </Offcanvas.Header>
    //             <Offcanvas.Body>
    //               <Nav className="justify-content-end flex-grow-1 pe-3">
    //                 <p>Welcome, {agent.username}!</p>
    //                 <Link to="/" onClick={handleClose}>Home</Link>
    //                 <Link to="/accounts" onClick={handleClose}>Accounts</Link>
    //                 <Link to="/users" onClick={handleClose}>Users</Link>
    //                 {/* <Link to="/users" onClick={handleClose}>Users</Link> */}
    //                 <Link to='/customers' onClick={handleClose}>Customers</Link>
    //                 <Link to="/quotes" onClick={handleClose}>Quotes</Link>
    //                 <Link to='/configurations' onClick={handleClose}>Configurations</Link>
    //                 <ButtonMailto label="Support" mailto="mailto:tonyeder11@gmail.com?subject=Quote Pro Assistance Needed&body=Hello Admin, I could use some help with the following items:" />
    //                 <hr />
    //                 <button onClick={handleLogoutClick}>Logout</button>
    //               </Nav>
    //             </Offcanvas.Body>
    //           </Navbar.Offcanvas>
    //         </Container>
    //       </Navbar>
    //     ) : (
    //       <Navbar expanded={expanded} expand={false} className="bg-body-tertiary mb-3">
    //         <Container fluid>
    //           <Navbar.Brand href="/">qp</Navbar.Brand>
    //           <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggle} />
    //           <Navbar.Offcanvas
    //             id="offcanvasNavbar"
    //             aria-labelledby="offcanvasNavbarLabel"
    //             placement="end"
    //             show={expanded}
    //             onHide={handleClose}
    //           >
    //             <Offcanvas.Header closeButton>
    //               <Offcanvas.Title id="offcanvasNavbarLabel">
    //                 QuotePro
    //               </Offcanvas.Title>
    //             </Offcanvas.Header>
    //             <Offcanvas.Body>
    //               <Nav className="justify-content-end flex-grow-1 pe-3">
    //                 <p>Welcome, {agent.username}!</p>
    //                 <Link to="/" onClick={handleClose}>Home</Link>
    //                 <Link to={`/accounts/${valueId}`} onClick={handleClose}>My Account</Link>
    //                 {/* <Link to="/users" onClick={handleClose}>Users</Link> */}
    //                 <Link to={`/accounts/${valueId}/quotes`} onClick={handleClose}>My Quotes</Link>
    //                 <Link to={`/accounts/${valueId}/new-quote`} onClick={handleClose}>New Quote</Link>
    //                 <Link to ={`/accounts/${valueId}/customers`} onClick={handleClose}>My Customers</Link>
    //                 <ButtonMailto label="Support" mailto="mailto:tonyeder11@gmail.com?subject=Quote Pro Assistance Needed&body=Hello Admin, I could use some help with the following items:" />
    //                 <hr />

    //                 <button onClick={handleLogoutClick}>Logout</button>
    //               </Nav>
    //             </Offcanvas.Body>
    //           </Navbar.Offcanvas>
    //         </Container>
    //       </Navbar> 
    //       ))  : null}
    //   </>
    // );

    <>
      {agent ? (agent.role_id == 1 ? (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >qp
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="sr-only">qp</span>
            </Link>
            <Link className="text-foreground transition-colors hover:text-foreground" to="/" >Home</Link>
            <Link className="text-muted-foreground hover:text-foreground" to="/accounts" >Accounts</Link>
            <Link className="text-muted-foreground hover:text-foreground" to="/users" >Users</Link>
            <Link className="text-muted-foreground hover:text-foreground" to='/customers' >Customers</Link>
            <Link className="text-muted-foreground hover:text-foreground" to="/quotes" >Quotes</Link>
            <Link className="text-muted-foreground hover:text-foreground" to='/configurations' >Configurations</Link>
          </nav>
          <Sheet open={expanded} onOpenChange={setExpanded}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                onClick={handleToggle}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={handleClose} // This will close the Sheet when clicked
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link className="hover:text-foreground" to="/" onClick={handleClose}>Home</Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/accounts" onClick={handleClose}>Accounts</Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/users" onClick={handleClose}>Users</Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to='/customers' onClick={handleClose}>Customers</Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to="/quotes" onClick={handleClose}>Quotes</Link>
                <Link className="text-muted-foreground transition-colors hover:text-foreground" to='/configurations' onClick={handleClose}>Configurations</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {/* <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full ml-auto">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <ButtonMailto label="Support" mailto="mailto:tonyeder11@gmail.com?subject=Quote Pro Assistance Needed&body=Hello Admin, I could use some help with the following items:" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                  <button onClick={handleLogoutClick}>Logout</button>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>) : (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >qp
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="sr-only">qp</span>
            </Link>
            <Link className="text-foreground transition-colors hover:text-foreground" to="/" >Home</Link>
            <Link className="text-muted-foreground hover:text-foreground" to={`/accounts/${valueId}`} >My Account</Link>
            <Link className="text-muted-foreground hover:text-foreground" to={`/accounts/${valueId}/quotes`} >My Quotes</Link>
            <Link className="text-muted-foreground hover:text-foreground" to={`/accounts/${valueId}/new-quote`} >New Quote</Link>
            <Link className="text-muted-foreground hover:text-foreground" to ={`/accounts/${valueId}/customers`} >My Customers</Link>
          </nav>
          <Sheet open={expanded} onOpenChange={setExpanded}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                onClick={handleToggle}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={handleClose} // This will close the Sheet when clicked
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link className="hover:text-foreground" to="/" onClick={handleClose}>Home</Link>
                <Link className="text-muted-foreground hover:text-foreground" to={`/accounts/${valueId}`} onClick={handleClose}>My Account</Link>
            <Link className="text-muted-foreground hover:text-foreground" to={`/accounts/${valueId}/quotes`} onClick={handleClose}>My Quotes</Link>
            <Link className="text-muted-foreground hover:text-foreground" to={`/accounts/${valueId}/new-quote`} onClick={handleClose}>New Quote</Link>
            <Link className="text-muted-foreground hover:text-foreground" to ={`/accounts/${valueId}/customers`} onClick={handleClose}>My Customers</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            {/* <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full ml-auto">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <ButtonMailto label="Support" mailto="mailto:tonyeder11@gmail.com?subject=Quote Pro Assistance Needed&body=Hello Admin, I could use some help with the following items:" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                  <button onClick={handleLogoutClick}>Logout</button>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      )) : null}
    </>
  )
}

export default NavBar;
