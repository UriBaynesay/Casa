import { stayService } from "../../services/stay.service"
import { PopDestinationList } from "./pop-destination-list"

export const PopDestination = () => {
  const destinations = stayService.getPopDestinations()

  return (
    <section className="pop-cities main-layout">
      <div className="pop-cities-container">
        <h1 className="title">Popular Destinations</h1>
        <PopDestinationList destinations={destinations} />
      </div>
    </section>
  )
}
