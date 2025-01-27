import { useEffect } from "react"

import { Hero } from "../cmps/homepage-cmps/hero.jsx"
import { PopDestination } from "../cmps/homepage-cmps/pop-destination.jsx"
import { TopRated } from "../cmps/homepage-cmps/top-rated.jsx"
import { AppHeader } from "../cmps/app-header.jsx"

export const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <AppHeader theme={"homepage"} />
      <main className="homepage">
        <Hero />
        <PopDestination />
        <TopRated />
      </main>
    </>
  )
}
