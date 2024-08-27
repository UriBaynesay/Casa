const fs = require("fs").promises
const { makeId } = require("./util.service")

async function uploadImages(images) {
  const uploadedImagesNames = []
  for (let i = 0; i < images.length; i++) {
    if (/^image/.test(images[i].mimetype)) {
      const imageName = makeId() + ".jpeg"
      await images[i].mv("assets/images/" + imageName, (err) => console.log(err))
      uploadedImagesNames.push(imageName)
    } else {
      const removePromises = []
      for (let j = 0; j < uploadedImagesNames.length; j++) {
        removePromises.push(fs.rm("assets/images/" + uploadedImagesNames[j],{force:true}))
      }
      await Promise.all(removePromises)
      return []
    }
  }
  return uploadedImagesNames
}

module.exports = { uploadImages }
