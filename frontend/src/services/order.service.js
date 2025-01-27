import { httpService } from "./http.service"

const END_POINT = "order"

export const orderService = {
  query,
  saveOrder,
  getById,
  remove,
  getUserOrdersStats,
}

// you can pass in filterBy {userId,hostId,stayId}
async function query(filterBy) {
  try {
    const orders = await httpService.get(END_POINT, filterBy)
    return orders
  } catch (error) {
    throw error.data
  }
}

async function getById(orderId) {
  try {
    const order = await httpService.get(`${END_POINT}/${orderId}`)
    return order
  } catch (error) {
    throw error.data
  }
}

async function remove(orderId) {
  try {
    return await httpService.delete(`${END_POINT}/${orderId}`)
  } catch (error) {
    throw error.data
  }
}

// to add an order you have to give {stayId,hostId,startDate,endDate}
async function saveOrder(order) {
  if (!order._id) {
    try {
      const newOrder = await httpService.post(END_POINT, order)
      return newOrder
    } catch (error) {
      throw error.data
    }
  }
  try {
    const updatedOrder = await httpService.put(
      `${END_POINT}/${order._id}`,
      order
    )
    return updatedOrder
  } catch (error) {
    throw error.data
  }
}

function getUserOrdersStats(orders) {
  const stats = {}
  if (!orders)
    return {
      avgRating: 0,
      totalRevenue: 0,
      ordersStatus: {
        total: 0,
        pending: 0,
        accepted: 0,
        declined: 0,
      },
    }
  stats.avgRating = _getAvgRating(orders)
  stats.totalRevenue = _getTotalRevenue(orders)
  stats.ordersStatus = _getOrdersStatus(orders)
  return stats
}

function _getAvgRating(orders) {
  const sum = orders.reduce((acc, order) => {
    return acc + order.stay.reviewScores.rating
  }, 0)
  return sum / orders.length
}

function _getTotalRevenue(orders) {
  return orders.reduce((acc, order) => {
    if (order.status === "accepted") return acc + order.price
    return acc
  }, 0)
}

function _getOrdersStatus(orders) {
  return orders.reduce(
    (acc, order) => {
      acc["total"]++
      if (order.status === "pending") acc["pending"]++
      else if (order.status === "accepted") acc["accepted"]++
      else if (order.status === "declined") acc["declined"]++
      return acc
    },
    {
      total: 0,
      pending: 0,
      accepted: 0,
      declined: 0,
    }
  )
}
