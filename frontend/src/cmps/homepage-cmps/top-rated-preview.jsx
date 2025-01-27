import { Link } from "react-router-dom"
import { stayService } from "../../services/stay.service"

export const TopRatedPreview = ({ stay }) => {
  return (
    <div className="card">
      <Link to={`/stay/details/${stay._id}`}>
        <img
          src={stayService.getImageUrl(stay.imgUrls[0])}
          alt=""
          loading="lazy"
        />
        <div className="city-details">
          <span className="title">{stay.name} </span>
          <span className="street">{stay.address.street}</span>
        </div>
      </Link>
    </div>
  )
}
