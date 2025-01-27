import { UserOrderPreview } from "./user-order-preview"

export const UserOrdersList = ({ orders, onUpdateOrder }) => {
  return (
    <div className="user-orders-list-container">
      {orders.map((order) => {
        return (
          <UserOrderPreview
            key={order._id}
            order={order}
            onUpdateOrder={onUpdateOrder}
          />
        )
      })}
    </div>
  )
}
