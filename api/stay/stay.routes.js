const express = require("express")
const { requireAuth } = require("../../middlewares/requireAuth.middleware")
const { log } = require("../../middlewares/logger.middleware")
const {
  addStay,
  getStays,
  deleteStay,
  getStayById,
  updateStay,
  addReview,
  getTopStays,
} = require("./stay.controller")
const router = express.Router()

// middleware that is specific to this router
//router.use(requireAuth)

router.get("/", log, getStays)
router.get("/top-stays", getTopStays)
router.get("/:stayId", getStayById)
router.post("/", log, requireAuth, addStay)
router.put("/:stayId", requireAuth, updateStay)
router.post("/review/:stayId", requireAuth, addReview)
router.delete("/:stayId", requireAuth, deleteStay)

module.exports = router
