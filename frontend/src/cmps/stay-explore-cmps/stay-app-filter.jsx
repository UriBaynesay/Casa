import { useLocation, useNavigate } from "react-router-dom"
import { stayService } from "../../services/stay.service"
import { FilterIconPreview } from "./filter-icon-preview"

export function StayAppFilter({ onChangeFilter }) {
  const filterNames = stayService.getLabels()
  const location = useLocation()
  const navigate = useNavigate()
  const handleSetFilter = (label) => {
    const searchParam=new URLSearchParams(location.search)
    searchParam.delete("label")
    searchParam.append("label", label)
    navigate(location.pathname+'?'+searchParam.toString())
    onChangeFilter({ label })
  }

  return (
    <div className="icon-filters-container">
      {filterNames.map((iconFilter, idx) => {
        return (
          <FilterIconPreview
            iconFilter={iconFilter}
            handleSetFilter={handleSetFilter}
            key={idx}
          />
        )
      })}
    </div>
  )
}
