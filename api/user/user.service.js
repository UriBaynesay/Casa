const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")
const ObjectId = require("mongodb").ObjectId

module.exports = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
}

async function query(filterBy = {}) {
  // const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection("user_db")
    var users = await collection.find(filterBy).toArray()
    users = users.map((user) => {
      delete user.password
      return user
    })
    return users
  } catch (err) {
    logger.error("cannot find users", err)
    throw err
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection("user_db")
    var user = await collection.findOne({ _id: userId })
    delete user.password
    return user
  } catch (err) {
    logger.error(`while finding user ${userId}`, err)
    throw err
  }
}
async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection("user_db")
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    logger.error(`while finding user ${username}`, err)
    throw err
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection("user_db")
    await collection.deleteOne({ _id: userId })
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(userId, updatedFields) {
  try {
    const collection = await dbService.getCollection("user_db")
    await collection.updateOne({ _id: userId }, { $set: updatedFields })
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user) {
  try {
    const userToAdd = {
      _id: ObjectId().toString(),
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      imgUrl: user.imgUrl,
      createdAt: Date.now(),
    }
    const collection = await dbService.getCollection("user_db")
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    logger.error("cannot insert user", err)
    throw err
  }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     return criteria
// }
