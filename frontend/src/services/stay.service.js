import { httpService } from "./http.service"

const END_POINT = "stay"

const labels = [
  "Design",
  "Beach",
  "Amazing Pools",
  "Islands",
  "National Parks",
  "Cabins",
  "Camping",
  "Tiny Homes",
  "Lakefront",
  "Arctic",
  "Desert",
  "Surfing",
  "Mansions",
  "Skiing",
  "Historical homes",
  "Campers",
]

const amenities = [
  "TV",
  "Cable TV",
  "Internet",
  "Wifi",
  "Air conditioning",
  "Wheelchair accessible",
  "Pool",
  "Kitchen",
  "Free parking on premises",
  "Doorman",
  "Gym",
  "Elevator",
  "Hot tub",
  "Heating",
  "Family/kid friendly",
  "Suitable for events",
  "Washer",
  "Dryer",
  "Smoke detector",
  "Carbon monoxide detector",
  "First aid kit",
  "Safety card",
  "Fire extinguisher",
  "Essentials",
  "Shampoo",
  "24-hour check-in",
  "Hangers",
  "Hair dryer",
  "Iron",
  "Laptop friendly workspace",
  "Self check-in",
  "Building staff",
  "Private entrance",
  "Room-darkening shades",
  "Hot water",
  "Bed linens",
  "Extra pillows and blankets",
  "Ethernet connection",
  "Luggage dropoff allowed",
  "Long term stays allowed",
  "Ground floor access",
  "Wide hallway clearance",
  "Wide doorway",
  "Flat path to front door",
  "Well-lit path to entrance",
  "Disabled parking spot",
  "Wide clearance to bed",
  "Step-free access",
  "Wide entryway",
  "Waterfront",
  "Beachfront",
]

const popDestinations = [
  {
    city: "Hong Kong",
    country: "China",
    img: require("../assets/img/countries/hongkong.jpg"),
  },
  {
    city: "Rio de Janeiro",
    country: "Brazil",
    img: require("../assets/img/countries/rio.jpg"),
  },
  {
    city: "Barcelona",
    country: "Spain",
    img: require("../assets/img/countries/barcelona.jpg"),
  },
  {
    city: "New York",
    country: "United States",
    img: require("../assets/img/countries/newyork.jpg"),
  },
]

export const stayService = {
  query,
  getById,
  getAmenities,
  getLabels,
  getPopDestinations,
  addStay,
  addReview,
  deleteStay,
  getTopRated,
  getImageUrl,
  updateStay,
}
// QUERY you can pass as a filter {hostId,stayLocation,label,guestCount}
async function query(filterBy) {
  try {
    const stays = await httpService.get(END_POINT, filterBy)
    return stays
  } catch (error) {
    throw error.data
  }
}

function getAmenities() {
  return [...amenities]
}
function getLabels() {
  return [...labels]
}

async function getTopRated() {
  try {
    const stays = await httpService.get(`${END_POINT}/top-stays`)
    return stays
  } catch (error) {
    throw error
  }
}

function getPopDestinations() {
  return [...popDestinations]
}

async function getById(stayId) {
  try {
    const stay = await httpService.get(`${END_POINT}/${stayId}`)
    return stay
  } catch (error) {
    throw error.data
  }
}

async function deleteStay(stayId) {
  try {
    return await httpService.delete(`${END_POINT}/${stayId}`)
  } catch (error) {
    throw error.data
  }
}

async function addStay(data) {
  try {
    const newStay = await httpService.post(END_POINT,data)
    return newStay
  } catch (error) {
    throw error.data
  }
}

async function updateStay(stayId, fields) {
  try {
    await httpService.put(`${END_POINT}/${stayId}`, fields)
  } catch (error) {
    throw error.data
  }
}

async function addReview(stayId, txt) {
  try {
    return await httpService.post(`${END_POINT}/review/${stayId}`, { txt })
  } catch (err) {
    throw err.data
  }
}

function getImageUrl(imgUrl) {
  const BASE =
    process.env.NODE_ENV === "production"
      ? "/api/"
      : "http://localhost:3030/api/"
  return BASE + `assets/images?imageName=${imgUrl}`
}
