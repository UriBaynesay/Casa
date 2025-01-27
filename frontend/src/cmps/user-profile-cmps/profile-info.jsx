import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const ProfileInfo = ({ user, stays }) => {
  const loggedInUserId = useSelector((store) => store.userModule.user?._id)
  const numOfReviews = stays.reduce((acc, stay) => {
    return acc + stay.reviews.length
  }, 0)

  let avgRating = 0
  if (stays.length !== 0) {
    avgRating =
      stays.reduce((acc, stay) => {
        return acc + stay.reviewScores.rating
      }, 0) / stays.length
  }

  return (
    <section className="user-info-container">
      {user && (
        <div className="profile-details-container">
          <div className="profile-image-container">
            <img src={user.imgUrl} alt="" loading="lazy"/>
          </div>
          <h3>{user.fullname}</h3>
          {loggedInUserId === user._id && <Link to={`/user/profile/edit/${loggedInUserId}`}>Edit</Link>}
        </div>
      )}
      <div className="profile-hosting-stats-container">
        <p>
          <span>{numOfReviews}</span> Reviews
        </p>
        <p>
          <span>{avgRating / 10}</span> Rating
        </p>
      </div>
    </section>
  )
}
