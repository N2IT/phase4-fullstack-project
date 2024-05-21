import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'
import NavBar from './NavBar'


const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/api/check-session')
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
  },[])

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
