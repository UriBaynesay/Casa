import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { orderService } from "../services/order.service"
import {
  socketService,
  SOCKET_EVENT_NEW_ORDER,
  SOCKET_EVENT_UPDATED_ORDER,
} from "../services/socket.service"
import { UserOrdersList } from "../cmps/user-orders-cmps/user-orders-list"
import { UserOrdersStats } from "../cmps/user-orders-cmps/user-orders-stats"
import { updateUserNotification } from "../store/action/user.action"
import { AppHeader } from "../cmps/app-header"

const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const tableTitles = [
    { class: "stay-name-title", title: "Stay name" },
    { class: "user-fullname-title", title: "Guest name" },
    { class: "order-total-title", title: "Order total" },
    { class: "order-start-date-title", title: "Start date" },
    { class: "order-end-date-title", title: "End date" },
    { class: "order-status-title", title: "Order status" },
    { class: "action-title", title: "Actions" },
  ]
  const { user } = useSelector((storeState) => storeState.userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    socketService.on(SOCKET_EVENT_NEW_ORDER, loadUserOrders)
    socketService.on(SOCKET_EVENT_UPDATED_ORDER, loadUserOrders)
    if (user) {
      dispatch(updateUserNotification(false))
      if (!orders.length) loadUserOrders()
    }

    return () => {
      socketService.off(SOCKET_EVENT_NEW_ORDER, loadUserOrders)
      socketService.off(SOCKET_EVENT_UPDATED_ORDER, loadUserOrders)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadUserOrders = async () => {
    try {
      const userOrders = await orderService.query({ hostId: user._id })
      if (userOrders.length) setOrders(userOrders)
    } catch (error) {
      console.error(error)
    }
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
        <section className="user-orders-container">
          {orders.length ? <UserOrdersStats orders={orders} /> : ""}
          <h2 className="order-title">Orders for your stays</h2>
          {orders.length ? (
            <Fragment>
              <div className="user-orders-table-titles-container">
                {tableTitles.map((title) => (
                  <h4 className={title.class} key={title.title}>
                    {title.title}
                  </h4>
                ))}
              </div>
              <UserOrdersList orders={orders} onUpdateOrder={onUpdateOrder} />
            </Fragment>
          ) : (
            <p>No orders</p>
          )}
        </section>
      </main>
    </>
  )
}

export default UserOrders