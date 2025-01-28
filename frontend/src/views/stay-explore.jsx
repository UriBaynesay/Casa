import { useEffect, useState } from "react"

import { StayList } from "../cmps/stay-explore-cmps/stay-list.jsx"
import { StayAppFilter } from "../cmps/stay-explore-cmps/stay-app-filter.jsx"
import { AppHeader } from "../cmps/app-header.jsx"
import { useNavigate, useSearchParams } from "react-router-dom"
import { stayService } from "../services/stay.service.js"

const StayExplore = () => {
  const [stays, setStays] = useState()
  const [searchParams] = useSearchParams()
  const [filterIconsOpen, setFilterIconsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchStays(searchParams)
    window.scrollTo({top:true,behavior:"smooth"})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const fetchStays = async (filter) => {
    try {
      const fetchedStays = await stayService.query(filter)
      if (fetchedStays.length) setStays(fetchedStays)
      else if (parseInt(searchParams.get("page")) > 0) {
        searchParams.set("page", parseInt(searchParams.get("page")) - 1)
        navigate("/stays?" + searchParams.toString())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangePage = async (amount) => {
    searchParams.set("page", parseInt(searchParams.get("page")) + amount)
    if (parseInt(searchParams.get("page")) >= 0) {
      navigate("/stays?" + searchParams.toString())
    }
  }

  const onChangeFilter = () => {
    if (filterIconsOpen) onToggleSideBar()
  }

  const onToggleSideBar = () => {
    const elSideBar = document.querySelector(".icon-filters-container")
    elSideBar.style.display = filterIconsOpen ? "none" : "flex"
    setFilterIconsOpen(!filterIconsOpen)
  }

  return (
    <>
      <AppHeader theme={"stay-explore"} />
      <main className="main-layout">
        <div className="stay-app-container">
          <div className="filter-btn-container" onClick={onToggleSideBar}>
            <img
              src={require("../assets/img/Icons/filters.PNG")}
              alt=""
              loading="lazy"
            />
          </div>
          <StayAppFilter onChangeFilter={onChangeFilter} />
          {stays && <StayList stays={stays} isUserStayPage={false} />}
          <div className="pagination-container">
            <button onClick={() => handleChangePage(-1)}>Previous</button>
            <span>{parseInt(searchParams.get("page")) + 1}</span>
            <button onClick={() => handleChangePage(1)}>Next</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default StayExplore
