import starIcon from "../../assets/img/svgs/star.svg"

export const StayReviewScore = ({ reviewScores, reviews }) => {
  return (
    <div className="reviews-score">
      <h1>
        <img width="14px" src={starIcon} alt="" loading="lazy"/>{" "}
        {(reviewScores.rating / 100).toFixed(1) * 5} · {reviews.length} reviews
      </h1>
      <div className="rating-breakdown">
        <h4 className="cleanliness">Cleanliness </h4>
        <div className="meter-container c-review">
          <meter max="5" value={reviewScores.value / 2}></meter>
          <span>{reviewScores.cleanliness / 2}</span>
        </div>
        <h4 className="communication">Communication </h4>
        <div className="meter-container communi-review">
          <meter max="5" value={reviewScores.value / 2}></meter>
          <span>{reviewScores.communication / 2}</span>
        </div>
        <h4 className="check-in">Check-in </h4>
        <div className="meter-container checkin-review">
          <meter max="5" value={reviewScores.value / 2}></meter>
          <span>{reviewScores.checkin / 2}</span>
        </div>
        <h4 className="accuracy">Accuracy </h4>
        <div className="meter-container acc-review">
          <meter max="5" value={reviewScores.value / 2}></meter>
          <span>{reviewScores.accuracy / 2}</span>
        </div>
        <h4 className="location">Location </h4>
        <div className="meter-container loc-review">
          <meter max="5" value={reviewScores.value / 2}></meter>
          <span>{reviewScores.location / 2}</span>
        </div>
        <h4 className="value">Value </h4>
        <div className="meter-container val-review">
          <meter max="5" value={reviewScores.value / 2}></meter>
          <span>{reviewScores.value / 2}</span>
        </div>
      </div>
    </div>
  )
}
