import { Link } from "react-router-dom"

export const StayDescription = ({stay})=>{
    return (
      <>
        <section className="short-info-container">
          <div className="txt-info">
            <h2>
              {stay.roomType} hosted by {stay.host.fullname}
            </h2>
            <h4>
              {" "}
              {stay.capacity} guests · {stay.bedrooms} bedrooms · {stay.beds}{" "}
              beds · {stay.bathrooms} baths
            </h4>
          </div>
          <Link to={`/user/profile/${stay.host._id}`}>
            {" "}
            <div className="host-img-container">
              <img src={stay.host.thumbnailUrl} alt="" loading="lazy"/>
            </div>
          </Link>
        </section>
        <section className="summary">
          <p>{stay.summary}</p>
        </section>
      </>
    )
}