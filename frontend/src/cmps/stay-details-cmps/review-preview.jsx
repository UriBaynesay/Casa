import { Link } from "react-router-dom"

export const ReviewPreview = ({ review, isReviewsExpanded }) => {
  return (
    <article className="review-card">
      <Link to={`/user/profile/${review.by._id}`}>
        <div className="writer-info-container">
          <div className="writer-img-container">
            <img src={review.by.imgUrl} alt="" loading="lazy"/>
          </div>
          <h4>{review.by.fullname}</h4>
        </div>
      </Link>
      <p
        style={
          isReviewsExpanded ? { height: "fit-content" } : { height: "72px" }
        }
      >
        {review.txt}
      </p>
    </article>
  )
}
