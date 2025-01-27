import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { onLogin } from "../store/action/user.action.js"
import { LoginForm } from "../cmps/login-cmps/login-form.jsx"
import { AppHeader } from "../cmps/app-header.jsx"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    if (loggedInUser) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser])

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const data = new FormData(ev.currentTarget)
    const credentials = {
      username: data.get("username"),
      password: data.get("password"),
    }
    dispatch(onLogin(credentials))
  }

  return (
    <div className="login-page">
      <AppHeader />
      <main className="main-layout">
        <section className="login-container">
          <LoginForm handleSubmit={handleSubmit} />
        </section>
      </main>
    </div>
  )
}

export default Login