import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { StayList } from "../cmps/stay-explore-cmps/stay-list.jsx"
import { loadStays } from "../store/action/stay.action.js"
import { StayAppFilter } from "../cmps/stay-explore-cmps/stay-app-filter.jsx"
import { AppHeader } from "../cmps/app-header.jsx"
import { useSearchParams } from "react-router-dom"

const StayExplore = () => {
  const { stays } = useSelector((storeState) => storeState.stayModule)
  const [searchParams] = useSearchParams()
  const [filterIconsOpen, setFilterIconsOpen] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)

    dispatch(loadStays(searchParams))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

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
        </div>
      </main>
    </>
  )
}

export default StayExplore
