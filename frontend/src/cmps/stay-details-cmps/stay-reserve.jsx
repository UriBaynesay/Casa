import  { useState } from "react"
import {  useSelector } from "react-redux"

import { orderService } from "../../services/order.service"
import { showUserMsg } from "../../services/event-bus.service"
import { GuestModal } from "../header-cmps/search-by-guest-modal"
import { ReserveDateModal } from "./reserve-date-modal"
import { GradientButton } from "./gradient-button"
import starIcon from "../../assets/img/svgs/star.svg"

export const Reserve = ({
  stayId,
  hostId,
  price,
  rating,
  reviewsLength,
  numOfGuest,
}) => {
  const [guestCount, setGuestCount] = useState(0)
  const [dates, setDates] = useState(null)
  const [isDateModalOpen, setIsDateOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const { user } = useSelector((storeState) => storeState.userModule)

  const onSetDates = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    if (startDate.getDate() === endDate.getDate()) return
    const startDateStamp = startDate.getTime()
    const endDateStamp = endDate.getTime()
    setDates({ endDateStamp, startDateStamp })
    setIsDateOpen(false)
  }

  const onReserve = async () => {
    if (!user) {
      showUserMsg("Please login")
      return
    }
    if (!dates || !dates.endDateStamp || !dates.startDateStamp) {
      showUserMsg("Please select dates")
      setIsDateOpen(true)
      return
    }
    if (guestCount === 0) {
      showUserMsg("Please select the number of people visiting")
      setIsGuestModalOpen(true)
      return
    }
    try {
      await orderService.saveOrder({
        price: ((dates.endDateStamp - dates.startDateStamp) / 86400000) * price,
        hostId,
        stayId,
        guestCount,
        startDate: dates.startDateStamp,
        endDate: dates.endDateStamp,
      })
      showUserMsg("Order sent")
    } catch (err) {
      if (err === "not availble")
        showUserMsg("Sorry not availble in those dates")
      else showUserMsg("Failed to save your order please try again later")
    }
  }
  return (
    <section className="reserve-container">
      <div className="reserve-modal">
        <div className="top-info">
          <h1>
            ${price.toLocaleString()}{" "}
            <span className="night-container">night</span>
          </h1>
          <div className="stats">
            <span>
              <img width="14px" src={starIcon} alt="" loading="lazy"/>{" "}
              {(rating / 100).toFixed(1) * 5} ·
            </span>
            <span className="reviews"> {reviewsLength} reviews</span>
          </div>
        </div>

        <div
          className={`order-datepicker-guest ${
            isDateModalOpen || isGuestModalOpen ? "active" : ""
          }`}
        >
          <div
            className="date-picker-modal"
            onClick={() => setIsDateOpen(!isDateModalOpen)}
          >
            <ReserveDateModal
              dates={dates}
              isDateModalOpen={isDateModalOpen}
              onSetDates={onSetDates}
            />
          </div>

          <h3
            className="guests-title"
            onClick={() => {
              setIsGuestModalOpen(!isGuestModalOpen)
            }}
          >
            {guestCount ? guestCount + " guests" : "Guests"}
          </h3>
          {isGuestModalOpen && (
            <GuestModal
              setGuests={setGuestCount}
              maxGuests={numOfGuest}
              onCloseModal={() => {
                setIsGuestModalOpen(false)
              }}
            />
          )}
        </div>

        <GradientButton txt="Reserve" cb={onReserve} />

        <h4>You won't be charged yet.</h4>
        <div className="total-container">
          <h3>Total</h3>
          <h3>
            $
            {dates !== null
              ? (
                  ((dates.endDateStamp - dates.startDateStamp) / 86400000) *
                  price
                ).toLocaleString()
              : "0"}
          </h3>
        </div>
      </div>
    </section>
  )
}
