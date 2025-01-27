import { useNavigate } from "react-router-dom"

import { PopDestinationPreview } from "./pop-destination-preview"

export const PopDestinationList = ({ destinations }) => {

  const navigate = useNavigate()

  const onSetFilter = (stayLocation) => {
    const searchParams = new URLSearchParams()
    searchParams.append("stayLocation",stayLocation)
    navigate("/stays?"+searchParams.toString())
  }

  return (
    <div className="cards-container">
      {destinations.map((destination, idx) => {
        return (
          <PopDestinationPreview
            destination={destination}
            onSetFilter={onSetFilter}
            key={idx}
          />
        )
      })}
    </div>
  )
}
