import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { SearchModal } from "./search-modal.jsx"

import SearchIcon from "@mui/icons-material/Search"

export const StaySearch = () => {
  const [layout, setLayout] = useState(null)
  const [searchBy, setSearchBy] = useState({})
  const [openModal, setOpenModal] = useState(null)
  const [dates, setDates] = useState()
  const location = useLocation()
  const navigate = useNavigate()

  const onOpenModal = (modal) => {
    setOpenModal(modal)
  }

  const onCloseModal = () => {
    setOpenModal(null)
  }

  const onSetFilter = (value, name) => {
    setSearchBy({ ...searchBy, [name]: value })
    if (name === "stayLocation") setOpenModal(null)
  }

  const onSearch = (ev = null) => {
    if (ev) ev.preventDefault()
    // dispatch(setFilterBy(searchBy))
    // setSearchBy({})
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append("page", 0)
    for (const key in searchBy) {
      urlSearchParams.append(key, searchBy[key])
    }
    if (dates && dates.startDate && dates.endDate) {
      urlSearchParams.append("startDate", dates.startDate)
      urlSearchParams.append("endDate", dates.endDate)
    }
    setOpenModal(null)
    navigate("/stays?" + urlSearchParams.toString())
  }

  const onSetDates = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    if (startDate.getDate() === endDate.getDate()) return
    const startDateStamp = startDate.getTime()
    const endDateStamp = endDate.getTime()
    setDates({ endDate: endDateStamp, startDate: startDateStamp })
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setLayout("homepage")
    } else {
      setLayout("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <section className={`search-container ${layout}`}>
      <div className="input-container">
        <div className="location-container flex space-between">
          <div className="txt" onClick={() => onOpenModal("location")}>
            <h4 className="title">Location</h4>
            <input
              type="text"
              name="stayLocation"
              value={searchBy?.stayLocation ? searchBy.stayLocation : ""}
              placeholder="Where are you going"
              onChange={(ev) => onSetFilter(ev.target.value, ev.target.name)}
            />
          </div>
          <div className="separator"></div>
        </div>

        <div className="date-checkin-container flex space-between">
          <div className="txt" onClick={() => onOpenModal("date")}>
            <h4 className="title">Check in</h4>
            <h4 className="description">Add dates</h4>
          </div>
          <div className="separator"></div>
        </div>

        <div className="date-checkout-container flex space-between">
          <div className="txt" onClick={() => onOpenModal("date")}>
            <h4 className="title">Check out</h4>
            <h4 className="description">Add dates</h4>
          </div>
          <div className="separator"></div>
        </div>

        <div className="guests-container flex space-between">
          <div className="txt" onClick={() => onOpenModal("guests")}>
            <h4 className="title">Guests</h4>
            <h4 className="description">Add guests</h4>
          </div>
        </div>

        <div className="search-btn-container">
          <div className="search-btn" onClick={() => onSearch()}>
            <SearchIcon htmlColor="#fff" />
          </div>
        </div>
      </div>
      <div className="modal-container">
        {openModal && (
          <SearchModal
            modal={openModal}
            onSetFilter={onSetFilter}
            onCloseModal={onCloseModal}
            onSetDates={onSetDates}
          />
        )}
      </div>
    </section>
  )
}
