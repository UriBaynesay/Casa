const logger = require("../../services/logger.service")
const userService = require("../user/user.service")
const authService = require("../auth/auth.service")
// const socketService = require('../../services/socket.service')
const stayService = require("./stay.service")

async function getStays(req, res) {
  try {
    const stays = await stayService.query(req.query)
    res.send(stays)
  } catch (err) {
    logger.error("Cannot get stays", err)
    res.status(500).send({ err: "Failed to get stays" })
  }
}

async function getTopStays(req, res) {
  try {
    const stays = await stayService.topFiveStays()
    return res.json(stays)
  } catch (error) {
    return res.status(500).send(error)
  }
}

// GET BY ID
async function getStayById(req, res) {
  try {
    const { stayId } = req.params
    const stay = await stayService.getById(stayId)
    res.json(stay)
  } catch (err) {
    logger.error("Failed to get stay", err)
    res.status(500).send(err)
  }
}

async function deleteStay(req, res) {
  const loggedInUser = authService.validateToken(req.cookies.loginToken)
  try {
    const deletedCount = await stayService.remove(
      req.params.stayId,
      loggedInUser
    )
    if (deletedCount === 1) {
      return res.send("Deleted successfully" )
    } else {
      throw "You're not allowed to delete this stay"
    }
  } catch (err) {
    logger.error("Failed to delete stay", err)
    res.status(500).send("Not authorized to delete this stay" )
  }
}

async function addStay(req, res) {
  const loggedinUser = authService.validateToken(req.cookies.loginToken)

  try {
    const stayFields = req.body
    const stayImages = req.files.images
    stayFields.host = await userService.getById(loggedinUser._id)
    const newStay = await stayService.add(stayFields, stayImages)
    res.json(newStay)
  } catch (err) {
    logger.error("Failed to add stay", err)
    res.status(500).send("Failed to add stay")
  }
}

// Update stay
async function updateStay(req, res) {
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  const fields = req.body
  const { stayId } = req.params
  try {
    const stay = await stayService.getById(stayId)
    if (loggedinUser._id !== stay.host._id) throw "Not Authorized"
    await stayService.update(stayId, fields)
    res.send('Updated succesfully')
  } catch (err) {
    logger.error("Failed to update stay", err)
    res.status(500).send(err)
  }
}

async function addReview(req, res) {
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  const reviewTxt = req.body.txt
  const { stayId } = req.params
  try {
    const review = await stayService.addReview(loggedinUser, stayId, reviewTxt)
    res.json(review)
  } catch (err) {
    logger.error("Failed to add review", err)
    res.status(500).send("Failed to add review")
  }
}

module.exports = {
  getStays,
  getTopStays,
  deleteStay,
  addStay,
  getStayById,
  updateStay,
  addReview,
}
