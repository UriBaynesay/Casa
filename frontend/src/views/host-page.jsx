import { useNavigate } from "react-router-dom"
import { AppHeader } from "../cmps/app-header"

const HostPage = () => {
  const navigator = useNavigate()
  const goToUserDetails = () => {
    navigator("/userdetails/orders")
  }
  return (
    <>
      <AppHeader />
      <main className="host-page-container become-host-layout">
        <div className="host-img-container">
          <div className="host-img"></div>
        </div>
        <div className="host-action">
          <h1>Host your home on Casa</h1>
          <button className="host-btn" onClick={goToUserDetails}>
            Get Started!
          </button>
        </div>
      </main>
    </>
  )
}

export default HostPage