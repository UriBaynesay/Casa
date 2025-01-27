import { httpService } from "./http.service"

const END_POINT_AUTH = {
  signup: "auth/signup",
  login: "auth/login",
  logout: "auth/logout",
}
const END_POINT_USER = "user"

const STORAGE_KEY_LOGGEDIN_USER = "loggedInUser"

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
  setNotification,
}

async function getUsers() {
  try {
    const users = await httpService.get(END_POINT_USER)
    return users
  } catch (error) {
    throw error.data
  }
}

async function getById(userId) {
  try {
    const user = await httpService.get(`${END_POINT_USER}/${userId}`)
    return user
  } catch (error) {
    throw error.data
  }
}

async function remove(userId) {
  try {
    return await httpService.delete(`${END_POINT_USER}/${userId}`)
  } catch (error) {
    throw error.data
  }
}

async function update(updatedFields, userId) {
  try {
    await httpService.put(
      `${END_POINT_USER}/${userId}`,
      updatedFields
    )
    const updatedUser = {...getLoggedinUser(),...updatedFields}
    sessionStorage.setItem(
      STORAGE_KEY_LOGGEDIN_USER,
      JSON.stringify(updatedUser)
    )
    return updatedUser
  } catch (error) {
    throw error.data
  }
}

async function login(userCred) {
  try {
    const user = await httpService.post(END_POINT_AUTH.login, userCred)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
  } catch (err) {
    throw err.data
  }
}

// need username fullname and password
async function signup(userCred) {
  try {
    const user = await httpService.post(END_POINT_AUTH.signup, userCred)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
  } catch (err) {
    throw err.data
  }
}

async function logout() {
  await httpService.post(END_POINT_AUTH.logout)
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) || null
}

function setNotification(hasNotification) {
  const user = { ...getLoggedinUser() }
  user.notification = hasNotification
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}
