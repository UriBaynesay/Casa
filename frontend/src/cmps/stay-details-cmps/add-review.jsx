import {  useState } from "react"
import Avatar from "@mui/material/Avatar"

export const AddReview = ({ loggedInUser, addReview }) => {
  const [text, setText] = useState("")
  const handleChange = (value) => {
    setText(value)
  }
  return (
    <section className="add-review-container">
      <h2>Add Review</h2>
      {loggedInUser && (
        <div className="loggedin-user">
          <Avatar src={loggedInUser.imgUrl} />

          <h3>{loggedInUser.fullname}</h3>
        </div>
      )}
      <textarea
        type="text"
        name="txt"
        autoComplete="off"
        onChange={(ev)=>handleChange(ev.target.value)}
        value={text}
        placeholder="Add your review..."
      />
      <button
        onClick={() => {
          addReview(text)
          setText("")
        }}
      >
        {" "}
        Send{" "}
      </button>
    </section>
  )
}

