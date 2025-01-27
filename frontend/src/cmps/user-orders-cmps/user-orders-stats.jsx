import { orderService } from "../../services/order.service"

export const UserOrdersStats = ({ orders }) => {
  const userOrdersStats = orderService.getUserOrdersStats(orders)
  return (
    <div className="stats-container">
      <div className="avg-rating-container">
        <h1>Avg rating</h1>
        <h3>{userOrdersStats.avgRating}</h3>
      </div>
      <div className="total-revenue-container">
        <h1>Total revenue</h1>
        <h3>$ {userOrdersStats.totalRevenue}</h3>
      </div>
      <div className="orders-status-container">
        <div className="total-orders-container">
          <h1>Total</h1>
          <h3>{userOrdersStats.ordersStatus["total"]}</h3>
        </div>
        <div className="pending-orders-container">
          <h1>Pending</h1>
          <h3>{userOrdersStats.ordersStatus["pending"]}</h3>
        </div>
        <div className="total-accepted-container">
          <h1>Accepted</h1>
          <h3>{userOrdersStats.ordersStatus["accepted"]}</h3>
        </div>
        <div className="declined-accepted-container">
          <h1>Declined</h1>
          <h3>{userOrdersStats.ordersStatus["declined"]}</h3>
        </div>
      </div>
    </div>
  )
}
