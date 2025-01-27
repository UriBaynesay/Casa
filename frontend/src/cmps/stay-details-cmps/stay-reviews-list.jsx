import { ReviewPreview } from "./review-preview"

export const StayReviewsList = ({ isReviewsExpanded, reviews }) => {
  return (
    <div
      className="review-cards-container"
      style={isReviewsExpanded ? { maxHeight: "fit-content" } : null}
    >
      {reviews.map((review) => (
        <ReviewPreview
          key={review.by._id}
          isReviewsExpanded={isReviewsExpanded}
          review={review}
        />
      ))}
    </div>
  )
}
