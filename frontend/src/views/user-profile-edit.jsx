import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button, FormControl, TextField } from "@mui/material"
import { AppHeader } from "../cmps/app-header"
import { userService } from "../services/user.service"
import { showUserMsg } from "../services/event-bus.service"
import { onUpdate } from "../store/action/user.action"

const UserProfileEdit = () => {
  const userId = useSelector((store) => store.userModule.user._id)
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [inputFields, setInputFields] = useState({ fullname: "", imgUrl: "" })

  const handleChange = ({ target }) => {
    setInputFields({ ...inputFields, [target.name]: target.value })
  }

  const loadUser = async () => {
    try {
      const fetchedUser = await userService.getById(userId)
      setUser(fetchedUser)
      setInputFields({
        fullname: fetchedUser.fullname,
        imgUrl: fetchedUser.imgUrl,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    try {
      const user = await userService.update(inputFields, userId)
      dispatch(onUpdate(user))
      showUserMsg("Profile edited succesfully!", "success")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return (
    <>
      <AppHeader />
      <main className="profile-edit-container">
        {user && (
          <Fragment>
            <h2>Edit {user.fullname} profile</h2>
            <form onSubmit={onSubmit}>
              <FormControl fullWidth={true}>
                <TextField
                  margin="normal"
                  id="outlined-basic"
                  name="fullname"
                  value={inputFields.fullname}
                  type="text"
                  label="Full name"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  id="outlined-basic"
                  name="imgUrl"
                  label="Profile image URL"
                  onChange={handleChange}
                  value={inputFields.imgUrl}
                />
              </FormControl>
              <Button type="submit" size="small" variant="contained">
                Edit
              </Button>
            </form>
          </Fragment>
        )}
      </main>
    </>
  )
}

export default UserProfileEdit