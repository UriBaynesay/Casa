const express = require("express")
const { requireAuth } = require("../../middlewares/requireAuth.middleware")
const {
  getOrders,
  deleteOrder,
  addOrder,
  getOrderById,
  updateOrder,
} = require("./order.controller")
const router = express.Router()

router.get("/", getOrders)
router.get("/:orderId", getOrderById)
router.post("/", requireAuth, addOrder)
router.put("/:orderId", requireAuth, updateOrder)
router.delete("/:orderId", requireAuth, deleteOrder)

module.exports = router
