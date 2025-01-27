import { useState } from "react"
import { UserDetailsNavModal } from "./user-details-nav-modal"

export const UserNav = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpenModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="user" onClick={onOpenModal}>
      {user?.notification && <div className="notification"></div>}
      <img className="user-pic" src={user.imgUrl} alt="" loading="lazy"/>
      {isOpen && <UserDetailsNavModal userId={user._id}></UserDetailsNavModal>}
    </div>
  )
}
