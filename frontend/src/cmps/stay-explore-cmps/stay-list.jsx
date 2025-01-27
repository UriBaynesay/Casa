import { StayPreview } from "./stay-preview.jsx"
import React, { useEffect } from "react"
export function StayList({ stays, isUserStayPage }) {
  useEffect(() => {
    const elDots = document.querySelectorAll(".dot")
    elDots.forEach((dot) => {
      dot.addEventListener("click", handleDotClick)
    })

    return () => {
      elDots.forEach((dot) => {
        dot.removeEventListener("click", handleDotClick)
      })
    }
  }, [])

  const handleDotClick = (ev) => {
    ev.preventDefault()
  }

  return (
    <div className="stay-list-container">
      {stays.map((stay) => (
        <StayPreview
          key={stay._id}
          stay={stay}
          isUserStayPage={isUserStayPage}
        />
      ))}
    </div>
  )
}
