import { useEffect } from "react"

export const GradientButton = ({ txt, cb }) => {
  useEffect(() => {
    let btn = document.querySelector(".mouse-cursor-gradient-tracking")
    const gradiantEffect = (e) => {
      let rect = e.target.getBoundingClientRect()
      let x = e.clientX - rect.left
      let y = e.clientY - rect.top
      btn.style.setProperty("--x", x + "px")
      btn.style.setProperty("--y", y + "px")
    }
    btn.addEventListener("mousemove", gradiantEffect)
    return () => {
      btn.removeEventListener("mousemove", gradiantEffect)
    }
  }, [])
  return (
    <h3 className="reserve-btn mouse-cursor-gradient-tracking" onClick={cb}>
      {txt}
    </h3>
  )
}
