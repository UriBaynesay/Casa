import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { UserTripsList } from "../cmps/user-trips-cmps/user-trips-list"
import {
  socketService,
  SOCKET_EVENT_UPDATED_ORDER,
} from "../services/socket.service"
import { orderService } from "../services/order.service"
import { AppHeader } from "../cmps/app-header"

const UserTrips = () => {
  const [trips, setTrips] = useState([])
  const { user } = useSelector((storeState) => storeState.userModule)

  useEffect(() => {
    socketService.on(SOCKET_EVENT_UPDATED_ORDER, loadTrips)
    loadTrips()
    return () => {
      socketService.off(SOCKET_EVENT_UPDATED_ORDER, loadTrips)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadTrips = async () => {
    const userTrips = await orderService.query({ userId: user._id })
    setTrips(userTrips)
  }

  const onUpdateOrder = async (order, status) => {
    const updatedOrder = { ...order, status }
    try {
      await orderService.saveOrder(updatedOrder)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppHeader />
      <main className="user-profile main-layout">
        <section className="user-trips-container">
          <h2>Your trips</h2>
          {trips.length ? (
            <UserTripsList trips={trips} onUpdateOrder={onUpdateOrder} />
          ):<p>No trips</p>}
        </section>
      </main>
    </>
  )
}

export default UserTrips