import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from "react-router-dom";
import './App.css'
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [user, setUser] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [valueId, setValueId] = useState()
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [disabled, setAsDisabled] = useState(true)
  const [accountForm, setAccountForm] = useState(true)

  const onSubmitAccountForm = () => {
    setAccountForm(!accountForm)
  }

  useEffect(() => {
    fetch('/api/check-session')
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      })
  }, [])

  const handleIdClick = (value) => {
    setValueId(value.id)
    setUser(user)
    navigate(`/accounts/${value.id}`)
  }

  const handleEditClick = () => {
    setAsDisabled(!disabled)
  }

  return (
    <>
      <header className="header">
        <NavBar user={user} setUser={setUser} />
      </header>
      <Outlet context={[user, setUser, accounts, setAccounts, accountForm, setAccountForm, onSubmitAccountForm, errors, setErrors, handleIdClick, valueId, setValueId, isLoading, setIsLoading, disabled, setAsDisabled, handleEditClick]} />
    </>
  );
}

export default App
