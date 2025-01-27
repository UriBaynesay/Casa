import { stayService } from "../../services/stay.service"
import { useState } from "react"

import { AmenityIcon } from "./amenity-icon"
import { StayDescription } from "./stay-description"

export const StayInfo = ({ stay }) => {
  const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false)

  if (!stay) return <section className="stay-main-info-container"></section>
  const amenities = stayService.getAmenities()
  return (
    <section className="stay-main-info-container">
      <StayDescription stay={stay}></StayDescription>
      <section className="amenities-container">
        <h2>What this place offers</h2>
        <div
          className="amenities"
          style={isAmenitiesExpanded ? { maxHeight: "fit-content" } : null}
        >
          {amenities.map((amenity, idx) => {
            return (
              <AmenityIcon
                iconType={amenity}
                stayHas={stay.amenities.find((a) => a === amenity)}
                key={idx}
              />
            )
          })}
        </div>
        <div
          className="amenities-btn"
          onClick={() => {
            setIsAmenitiesExpanded(!isAmenitiesExpanded)
          }}
        >
          <h3>{isAmenitiesExpanded ? "Show less" : "Show more"}</h3>
        </div>
      </section>
    </section>
  )
}
