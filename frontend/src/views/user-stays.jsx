import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { AppHeader } from "../cmps/app-header"
import { stayService } from "../services/stay.service"
import { StayList } from "../cmps/stay-explore-cmps/stay-list"

const UserStays = () => {
  const [stays, setStays] = useState([])
  const { user } = useSelector((storeState) => storeState.userModule)

  useEffect(() => {
    if (user && !stays.length) loadUserStays()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const loadUserStays = async () => {
    try {
      const userStays = await stayService.query({ hostId: user._id })
      setStays(userStays)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppHeader />
      <main className="user-profile main-layout">
        <section className="user-stays-container">
          <h2>Your stays</h2>
          {stays.length ? (
            <StayList stays={stays} isUserStayPage={true}></StayList>
          ) : (
            <p>No stays</p>
          )}
        </section>
      </main>
    </>
  )
}

export default UserStays