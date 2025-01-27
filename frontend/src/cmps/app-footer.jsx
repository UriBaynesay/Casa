import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export function AppFooter() {
  const [footerLayout, setFooterLayout] = useState("")
  const location = useLocation()

  useEffect(() => {
    if (!location.pathname.includes("/details")) {
      setFooterLayout("main-layout")
    } else {
      setFooterLayout("details-layout")
    }
  }, [location])

  return (
    <footer className={footerLayout}>
      <div className="footer-container">
        <div className="copyright-container">© Uri Baynesay </div>
      </div>
    </footer>
  )
}
