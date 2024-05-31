import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AgentProvider } from './AgentProvider';


const App = () => {
 
  return (
    <>
      <AgentProvider>
        <header className="header">
          <NavBar />
        </header>
      <Outlet />
    </AgentProvider>

    </>
  );
}

export default App
