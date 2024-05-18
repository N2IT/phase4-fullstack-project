// import { useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import './App.css'
import NavBar from './NavBar'
import Home from './Home';
import CreateNewAccount from "./CreateNewAccount";
import ErrorPage from "./ErrroPage";

const App = () => {
  return (
    <>
      <header className="header">
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateNewAccount />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Outlet />
    </>
  );
}

export default App
