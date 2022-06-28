const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")
const ObjectId = require("mongodb").ObjectId


async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection("order_db")
    let orders = await collection
      .aggregate([
        { $match: criteria },
        {
          $lookup: {
            localField: "stayId",
            from: "stay_db",
            foreignField: "_id",
            as: "stay",
          },
        },
        {
          $unwind: "$stay",
        },
        {
          $lookup: {
            localField: "userId",
            from: "user_db",
            foreignField: "_id",
            as: "byUser",
          },
        },
        {
          $unwind: "$byUser",
        },
      ])
      .toArray()
    orders = orders.map((order) => {
      order.byUser = {
        _id: order.byUser._id,
        fullname: order.byUser.fullname,
        imgUrl: order.byUser.imgUrl,
      }
      delete order.userId
      delete order.stayId
      delete order.hostId
      return order
    })
    return orders
  } catch (err) {
    logger.error("cannot find orders", err)
    throw err
  }
}

async function getById(orderId) {
  try {
    const collection = await dbService.getCollection("order_db")
    const order = await collection.findOne({ _id: ObjectId(orderId) })
    return order
  } catch (err) {
    logger.error(`while finding order ${orderId}`, err)
    throw err
  }
}

async function remove(orderId, loggedInUser) {
  try {
    const collection = await dbService.getCollection("order_db")
    const criteria = { _id: ObjectId(orderId) }
    criteria.userId = ObjectId(loggedInUser._id)
    const { deletedCount } = await collection.deleteOne(criteria)
    return deletedCount
  } catch (err) {
    logger.error(`cannot remove order ${orderId}`, err)
    throw err
  }
}

async function add(order) {
  try {
    const orderToAdd = {
      startDate: order.startDate,
      endDate: order.endDate,
      userId: order.byUserId,
      stayId: order.stayId,
      hostId: order.hostId,
      price: order.price,
      guestCount: order.guestCount,
      status: "pending",
    }
    const collection = await dbService.getCollection("order_db")
    await collection.insertOne(orderToAdd)
    return orderToAdd
  } catch (err) {
    logger.error("cannot insert order", err)
    throw err
  }
}

async function update(order, loggedInUser) {
  try {
    if (loggedInUser._id !== order.byUser._id && loggedInUser._id !== order.stay.host._id)
      throw "not auth to update"
    const orderToSave = {
      _id: ObjectId(order._id),
      status: order.status,
      startDate: order.startDate,
      endDate: order.endDate,
    }
    const collection = await dbService.getCollection("order_db")
    await collection.updateOne(
      { _id: ObjectId(order._id) },
      { $set: { ...orderToSave } }
    )
    return order
  } catch (err) {
    logger.error(`cannot update order ${order._id}`, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  console.log(filterBy)
  const criteria = {}
  if (filterBy.hostId) {
    criteria.hostId = filterBy.hostId
  }
  if (filterBy.userId) {
    criteria.userId = filterBy.userId
  }
  if (filterBy.stayId) {
    criteria.stayId = filterBy.stayId
  }
  return criteria
}

module.exports = {
  query,
  remove,
  add,
  getById,
  update,
}
