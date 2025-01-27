import { useEffect, useState } from "react"
import { stayService } from "../../services/stay.service"
import { TopRatedList } from "./top-rated-list"

export const TopRated = () => {
  const [stays, setStays] = useState()

  useEffect(() => {
    fetchTopStays()
  }, [])

  const fetchTopStays = async () => {
    const fetchedStays = await stayService.getTopRated()
    setStays(fetchedStays)
  }

  return (
    <section className="top-rated main-layout">
      {stays && (
        <div className="top-rated-container">
          <h1 className="title">Top Rated</h1>
          <TopRatedList stays={stays} />
        </div>
      )}
    </section>
  )
}
