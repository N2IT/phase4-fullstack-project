import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from "react-router-dom";
import './App.css'
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [user, setUser] = useState(null)
  const [valueId, setValueId] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/check-session')
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
  },[])

  const handleIdClick = (value) => {
    setValueId(value.id)
    navigate(`/accounts/${value.id}`)
}

  return (
    <>
      <header className="header">
        <NavBar user={user} setUser={setUser}/>
      </header>
      <Outlet context={[user, setUser, handleIdClick, valueId]}/>
    </>
  );
}

export default App
