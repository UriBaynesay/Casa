import { Fragment, useState } from "react"
import { StayReviewsList } from "../stay-details-cmps/stay-reviews-list"
import { StayList } from "../stay-explore-cmps/stay-list"

export const HostingInfo = ({ fullname, stays }) => {
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false)
  const reviews = stays.reduce((acc, stay) => {
    return [...acc, ...stay.reviews]
  }, [])

  const expandReviewsList = () => {
    setIsReviewsExpanded(!isReviewsExpanded)
  }
  return (
    <section className="hosting-info-container">
      <div className="profile-reviews-list-container">
        <h3>{fullname} Reviews</h3>
        {reviews.length ? (
          <Fragment>
            {" "}
            <StayReviewsList
              isReviewsExpanded={isReviewsExpanded}
              reviews={reviews}
            ></StayReviewsList>
            <div className="reviews-btn" onClick={expandReviewsList}>
              <h3>{isReviewsExpanded ? "Show less" : "Show more"}</h3>
            </div>
          </Fragment>
        ) : (
          <p>No Reviews</p>
        )}
      </div>

      <div className="profile-stays-list-container">
        <h3>{fullname} Stays</h3>
        {stays.length ? <StayList stays={stays} isUserStayPage={false}></StayList> : <p>No Stays</p>}
      </div>
    </section>
  )
}
