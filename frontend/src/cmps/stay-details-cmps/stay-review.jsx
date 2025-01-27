import { useState } from "react"

import { StayReviewScore } from "./stay-review-scores"
import { StayReviewsList } from "./stay-reviews-list"

export const StayReview = ({ reviewScores, reviews }) => {
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false)

  const expandReviewsList = () => {
    setIsReviewsExpanded(!isReviewsExpanded)
  }

  return (
    <section className="reviews-container">
      <StayReviewScore reviewScores={reviewScores} reviews={reviews} />
      <StayReviewsList
        isReviewsExpanded={isReviewsExpanded}
        reviews={reviews}
      />

      <div className="reviews-btn" onClick={expandReviewsList}>
        <h3>{isReviewsExpanded ? "Show less" : "Show more"}</h3>
      </div>
    </section>
  )
}
