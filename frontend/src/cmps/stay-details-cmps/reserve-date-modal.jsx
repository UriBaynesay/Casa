import React from "react"

import { SearchByDate as DatePicker } from "../header-cmps/stay-filter-search-dates"

export const ReserveDateModal = ({ dates, isDateModalOpen, onSetDates }) => {
  return (
    <React.Fragment>
      <h3 className="start-date">
        {dates
          ? new Date(dates.startDateStamp).toLocaleDateString()
          : "Check in"}
      </h3>
      <h3 className="end-date">
        {dates
          ? new Date(dates.endDateStamp).toLocaleDateString()
          : "Check out"}
      </h3>
      <div className="modal-container" onClick={(ev) => ev.stopPropagation()}>
        {isDateModalOpen && <DatePicker onSetDates={onSetDates} />}
      </div>
    </React.Fragment>
  )
}
