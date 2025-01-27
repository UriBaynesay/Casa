import { UserTripPreview } from "./user-trip-preview"

export const UserTripsList = ({ trips, onUpdateOrder }) => {
  const tableTitles = [
    { class: "stay-name-title", title: "Stay name" },
    { class: "stay-address-title", title: "Stay address" },
    { class: "user-fullname-title", title: "Owner name" },
    { class: "order-total-title", title: "Order total" },
    { class: "order-start-date-title", title: "Start date" },
    { class: "order-end-date-title", title: "End date" },
    { class: "order-status", title: "Status" },
    { class: "action-title", title: "Actions" },
  ]
  return (
    <section className="user-trips-list-container">
      <div className="user-trips-table-titles-container">
        {tableTitles.map((title) => (
          <h4 className={title.class}>{title.title}</h4>
        ))}
      </div>
      {trips.map((trip) => {
        return (
          <div className="user-trip-preview-container">
            <UserTripPreview trip={trip} onUpdateOrder={onUpdateOrder} />
          </div>
        )
      })}
    </section>
  )
}
