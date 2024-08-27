function uploadImages(images) {
  for (let i = 0; i < images.length; i++) {
    if (/^image/.test(images[i].mimetype)) {
      images[i].mv("assets/images/" + images[i].name, (err) => console.log(err))
    } else return false
  }
  return true
}

module.exports = { uploadImages }
