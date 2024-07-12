import { Outlet } from "react-router-dom";
import { StrictMode } from "react";
import './App.css'
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgentProvider } from './AgentProvider';

const App = () => {

  return (
    <>
      <StrictMode>
        <AgentProvider>
          <header className="header">
            <NavBar />
          </header>
          <Outlet />
        </AgentProvider>
      </StrictMode>
    </>
  );
}

export default App
