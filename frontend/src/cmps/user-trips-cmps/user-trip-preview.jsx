import React from "react"

export const UserTripPreview = ({ trip, onUpdateOrder }) => {
  return (
    <React.Fragment>
      <div className="stay-name">{trip.stay.name}</div>
      <div className="stay-address">{trip.stay.address.street}</div>
      <div className="host-fullname">{trip.stay.host.fullname}</div>
      <div className="trip-total">$ {trip.price}</div>
      <div className="trip-start-date">
        {new Date(trip.startDate).toLocaleDateString()}
      </div>
      <div className="trip-end-date">
        {new Date(trip.endDate).toLocaleDateString()}
      </div>
      <div className="trip-status">{trip.status}</div>
      <div className="action-container">
        <button
          className="decline-btn"
          disabled={trip.status === "declined" ? true : false}
          onClick={() => onUpdateOrder(trip, "declined")}
        >
          <div>Cancel</div>
        </button>
      </div>
    </React.Fragment>
  )
}
