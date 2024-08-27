const express = require("express")
const router = express.Router()

const { getImage } = require("./assets.controller")

router.get("/images", getImage)

module.exports = router
