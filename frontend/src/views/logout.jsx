import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { socketService } from "../services/socket.service"
import { onLogout } from "../store/action/user.action"
import { useEffect } from "react"

const Logout = ()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    logout()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const logout = () => {
    socketService.logout()
    dispatch(onLogout())
    navigate("/")
  }
}
export default Logout