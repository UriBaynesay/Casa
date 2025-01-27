import { useState } from "react"

import { utilService } from "../../services/util.service"

export const GuestModal = (props) => {
  const guests = utilService.guestTypes

  const [guestCount, setGuestCount] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  })

  const onChangeGuests = (type, diff) => {
    if (guestCount[type] === 0 && diff === -1) return
    const totalGuests =
      guestCount.adults + guestCount.children + guestCount.infants
    if (props.maxGuests && totalGuests === props.maxGuests && diff === 1) return
    if (props.onSetFilter) {
      props.onSetFilter(totalGuests + diff, "guestCount")
    } else {
      props.setGuests(totalGuests + diff)
    }
    setGuestCount({ ...guestCount, [type]: guestCount[type] + diff })
  }

  return (
    <div className="guest-modal-wrapper">
      <div className="guests-modal-container">
        {guests.map((guest) => {
          return (
            <div className="guest-input-container">
              <div className="txt">
                <h3>{guest.type}</h3>
                <h4>{guest.description}</h4>
              </div>
              <div className="btn-container">
                <div
                  className="btn"
                  onClick={() => onChangeGuests(guest.type.toLowerCase(), -1)}
                >
                  -
                </div>
                <div className="count-container">
                  {guestCount[guest.type.toLowerCase()]}
                </div>
                <div
                  className="btn"
                  onClick={() => onChangeGuests(guest.type.toLowerCase(), 1)}
                >
                  +
                </div>
              </div>
            </div>
          )
        })}
        <h3
          className="close-modal-btn"
          onClick={() => {
            props.onCloseModal()
          }}
        >
          Close
        </h3>
      </div>
    </div>
  )
}
