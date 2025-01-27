import starIcon from "../../assets/img/svgs/star.svg"

export const StayTitleInfo = ({
  name,
  reviewScores,
  host,
  reviews,
  address,
}) => {
  return (
    <section className="stay-title-info-container">
      <h1 className="stay-name">{name}</h1>
      <div className="short-desc">
        <div className="stats">
          <span>
            <img width="14px" src={starIcon} alt="" loading="lazy"/>{" "}
            {(reviewScores.rating / 100).toFixed(1) * 5} ·
          </span>
          <span className="reviews"> {reviews.length} reviews</span>
          <span className="seperate-dott">·</span>
          {host.isSuperhost && (
            <span className="super-host">
              Superhost
              <span className="seperate-dott">·</span>
            </span>
          )}
          <span className="address">{address.street}</span>
        </div>
      </div>
    </section>
  )
}
