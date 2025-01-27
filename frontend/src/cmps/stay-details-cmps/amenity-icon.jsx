import { Fragment } from "react"

import { AiOutlineWifi, AiOutlineCheckSquare } from "react-icons/ai"
import { FiMonitor } from "react-icons/fi"
import { FaTemperatureLow, FaSwimmingPool } from "react-icons/fa"
import {
  MdOutlineTakeoutDining,
  MdOutlineBeachAccess,
  MdOutlineLocalLaundryService,
  MdOutlineElevator,
  MdOutlineLuggage,
  MdOutlineIron,
} from "react-icons/md"
import { CgSmartHomeWashMachine } from "react-icons/cg"

export const AmenityIcon = ({ iconType, stayHas }) => {
  const amenitiesMap = {
    TV: <FiMonitor />,
    Wifi: <AiOutlineWifi />,
    Kitchen: <MdOutlineTakeoutDining />,
    Washer: <CgSmartHomeWashMachine />,
    Beachfront: <MdOutlineBeachAccess />,
    Dryer: <MdOutlineLocalLaundryService />,
    "Air conditioning": <FaTemperatureLow />,
    Elevator: <MdOutlineElevator />,
    "Luggage dropoff allowed": <MdOutlineLuggage />,
    Pool: <FaSwimmingPool />,
    Iron: <MdOutlineIron />,
  }

  if (!amenitiesMap[iconType]) return <></>

  return (
    <div className="amenity-icon-container">
      {stayHas ? (
        <Fragment>
          <AiOutlineCheckSquare />{" "}
          <span className="amenity-txt">{iconType}</span>
        </Fragment>
      ) : (
        <Fragment>
          {amenitiesMap[iconType]}{" "}
          <span className="amenity-txt">{iconType}</span>
        </Fragment>
      )}
    </div>
  )
}
