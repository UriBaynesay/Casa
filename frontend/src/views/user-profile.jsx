import { useEffect, useState } from "react"
import { AppHeader } from "../cmps/app-header"
import { useParams } from "react-router-dom"
import { userService } from "../services/user.service"
import { stayService } from "../services/stay.service"
import { ProfileInfo } from "../cmps/user-profile-cmps/profile-info"
import { HostingInfo } from "../cmps/user-profile-cmps/hosting-info"

const UserProfile = () => {
  const params = useParams()
  const [user, setUser] = useState()
  const [stays, setStays] = useState([])

  useEffect(() => {
    loadUserAndStays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId])

  const loadUserAndStays = async () => {
    try {
      const fetchedUser = await userService.getById(params.userId)
      const fetchedStays = await stayService.query({ hostId: fetchedUser._id })
      setUser(fetchedUser)
      setStays(fetchedStays)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="user-profile-page">
      <AppHeader />
      <main className="user-profile main-layout">
        {user && (
          <div className="user-profile-container">
            <ProfileInfo user={user} stays={stays}></ProfileInfo>
            <HostingInfo stays={stays}></HostingInfo>
          </div>
        )}
      </main>
    </div>
  )
}

export default UserProfile