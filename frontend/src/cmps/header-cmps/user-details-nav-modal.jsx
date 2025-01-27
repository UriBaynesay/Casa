import { Link } from "react-router-dom"

export const UserDetailsNavModal = ({userId}) => {
    const menuOptions = ["Profile", "Stays", "Orders", "Trips", "Logout"]
  return <div className="user-nav-menu-modal">
    {menuOptions.map(option=><Link to={`/user/${option.toLowerCase()}/${option==='Profile'?`${userId}`:""}`} key={option}>{option}</Link>)}
  </div>
}
