const dbService = require("../../services/db.service")
const logger = require("../../services/logger.service")
const { uploadImages } = require("../../services/upload.service")
const ObjectId = require("mongodb").ObjectId

const COLLECTION_NAME = "stay_db"

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection(COLLECTION_NAME)
    const stays = await collection.find(criteria).toArray()
    return stays
  } catch (err) {
    logger.error("cannot find stays", err)
    throw err
  }
}

async function topFiveStays() {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    const stays = collection
      .aggregate([{ $sort: { "reviewScores.rating": -1 } }, { $limit: 4 }])
      .toArray()
    return stays
  } catch (error) {
    throw error
  }
}

async function getById(stayId) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    const stay = await collection.findOne({ _id: stayId })
    if (stay) return stay
    throw `Stay ${stayId} was not found`
  } catch (err) {
    logger.error("While finding stay ", err)
    throw err
  }
}

async function remove(stayId, loggedInUser) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    const criteria = { _id: stayId }
    if (!loggedInUser.isAdmin) criteria["host._id"] = loggedInUser._id
    const { deletedCount } = await collection.deleteOne(criteria)
    return deletedCount
  } catch (err) {
    logger.error(`cannot remove stay ${stayId}`, err)
    throw err
  }
}

async function add(stayFields, images) {
  try {
    const imgUrls = await uploadImages(images)
    const stayToAdd = {
      _id: ObjectId().toString(),
      name: stayFields.name,
      summary: stayFields.summary,
      houseRules: stayFields.houseRules,
      propertyType: stayFields.propertyType,
      roomType: stayFields.roomType,
      capacity: stayFields.capacity,
      bedrooms: stayFields.bedrooms,
      beds: stayFields.beds,
      numOfReviews: 0,
      amenities: stayFields.amenities,
      address: stayFields.address,
      host: { ...stayFields.host, thumbnailUrl : stayFields.host.imgUrl},
      bathrooms: stayFields.bedrooms,
      price: stayFields.price,
      reviewScores: {
        accuracy: 0,
        cleanliness: 0,
        checkin: 0,
        communication: 0,
        location: 0,
        value: 0,
        rating: 0,
      },
      reviews: [],
      imgUrls: imgUrls,
    }
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.insertOne(stayToAdd)
    return stayToAdd
  } catch (err) {
    logger.error("cannot insert stay", err)
    throw err
  }
}

async function update(stayId, fields) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    await collection.updateOne({ _id: stayId }, { $set: fields })
  } catch (err) {
    logger.error(`cannot update stay ${stay._id}`, err)
    throw err
  }
}

async function addReview(by, stayId, txt) {
  try {
    const review = {
      at: new Date().toLocaleString(),
      by,
      txt,
    }
    const stay = await getById(stayId)
    stay.reviews.push(review)
    stay.numOfReviews+=1
    await update(stay._id,{reviews:[...stay.reviews],numOfReviews})
    return review
  } catch (err) {
    logger.error(`cannot add review to ${stay._id} `, err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  let criteria = { $and: [{}] }
  if (filterBy.stayLocation) {
    const regexLocation = new RegExp(filterBy.stayLocation, "i")
    criteria.$and.push({
      $or: [
        { "address.country": { $regex: regexLocation } },
        { "address.street": { $regex: regexLocation } },
        { "address.city": { $regex: regexLocation } },
      ],
    })
  }
  if (filterBy.label) {
    const regexLabel = new RegExp(filterBy.label, "i")
    criteria.$and.push({
      $or: [
        { name: { $regex: regexLabel } },
        { summary: { $regex: regexLabel } },
        { amenities: { $regex: regexLabel } },
      ],
    })
  }
  if (filterBy.hostId) {
    criteria.$and.push({ "host._id": filterBy.hostId })
  }
  if (filterBy.guestCount) {
    criteria.$and.push({ capacity: { $gte: +filterBy.guestCount } })
  }
  return criteria
}

module.exports = {
  query,
  topFiveStays,
  remove,
  add,
  getById,
  update,
  addReview,
}
