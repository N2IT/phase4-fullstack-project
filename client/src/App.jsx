// import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import NavBar from './NavBar'


const App = () => {
  return (
    <>
      <header className="header">
        <NavBar />
      </header>
      <Outlet />
    </>
  );
}

export default App
