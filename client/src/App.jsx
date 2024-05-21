import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import NavBar from './NavBar'


const App = () => {
  const [user, setUser] = useState(null)

  return (
    <>
      <header className="header">
        <NavBar user={user} setUser={setUser}/>
      </header>
      <Outlet context={[user, setUser]}/>
    </>
  );
}

export default App
