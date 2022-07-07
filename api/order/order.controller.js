const logger = require("../../services/logger.service")
const authService = require("../auth/auth.service")
const socketService = require("../../services/socket.service")
const orderService = require("./order.service")

async function getOrders(req, res) {
  try {
    const orders = await orderService.query(req.query)
    res.json(orders)
  } catch (err) {
    logger.error("Cannot get orders", err)
    res.status(500).send({ err: "Failed to get orders" })
  }
}

async function getOrderById(req, res) {
  try {
    const { orderId } = req.params
    const order = await orderService.getById(orderId)
    res.json(order)
  } catch (err) {
    logger.error("Failed to get order", err)
    res.status(500).send({ err: "Failed to get order" })
  }
}

async function deleteOrder(req, res) {
  var loggedInUser = authService.validateToken(req.cookies.loginToken)
  try {
    const deletedCount = await orderService.remove(
      req.params.orderId,
      loggedInUser
    )
    if (deletedCount === 1) {
      res.send({ msg: "Deleted successfully" })
    } else {
      res.status(400).send({ err: "Cannot remove order" })
    }
  } catch (err) {
    logger.error("Failed to delete order", err)
    res.status(500).send({ err: "Failed to delete order" })
  }
}

async function addOrder(req, res) {
  var loggedInUser = authService.validateToken(req.cookies.loginToken)
  try {
    var order = req.body
    const bookedDates = await _getBookedDates(order.stayId)
    await _checkAvailability(order.startDate, order.endDate, bookedDates)
    order.byUserId = loggedInUser._id
    order = await orderService.add(order)

    socketService.emitToUser({
      type: "new-order",
      data: order,
      userId: order.hostId,
    })

    res.json(order)
  } catch (err) {
    logger.error("Failed to add order", err)
    res.status(500).send(err)
  }
}

async function updateOrder(req, res) {
  var loggedInUser = authService.validateToken(req.cookies.loginToken)
  try {
    const order = req.body
    const updatedOrder = await orderService.update(order, loggedInUser)

    socketService.emitToUser({
      type: "updated-order",
      data: order,
      userId: order.byUser._id,
    })

    socketService.emitToUser({
      type: "updated-order",
      data: order,
      userId: order.stay.host._id,
    })

    res.json(updatedOrder)
  } catch (err) {
    logger.error("Failed to update order", err)
    res.status(500).send(err)
  }
}

async function _checkAvailability(startDate, endDate, bookedDates) {
  const problemDates = bookedDates.filter((date) => {
    if (endDate >= date.startDate && endDate <= date.endDate) {
      return true
    } else if (
      endDate > date.endDate &&
      startDate >= date.startDate &&
      startDate <= date.endDate
    ) {
      return true
    }
    return false
  })
  return problemDates.length > 0
    ? Promise.reject("not availble")
    : Promise.resolve("availble")
}

async function _getBookedDates(stayId) {
  const orders = await orderService.query({ stayId })
  const bookedDates = orders.map((order) => ({
    startDate: order.startDate,
    endDate: order.endDate,
  }))
  return bookedDates
}

module.exports = {
  getOrders,
  deleteOrder,
  addOrder,
  getOrderById,
  updateOrder,
}
