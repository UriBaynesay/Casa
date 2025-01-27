import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"

import { SearchModal } from "./search-modal.jsx"
import { setStays } from "../../store/action/stay.action.js"

import SearchIcon from "@mui/icons-material/Search"

export const StaySearch = () => {
  const [layout, setLayout] = useState(null)
  const [searchBy, setSearchBy] = useState({})
  const [openModal, setOpenModal] = useState(null)
  const location = useLocation()
  const dispatch = useDispatch()
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
    for(const key in searchBy){
      urlSearchParams.append(key,searchBy[key])
    }
    setOpenModal(null)
    navigate("/stays?"+urlSearchParams.toString())
  }

  useEffect(() => {
    if (location.pathname !== "/stays") {
      dispatch(setStays(null))
    }

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
          />
        )}
      </div>
    </section>
  )
}
