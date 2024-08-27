const fs = require('fs')

function getImage(req, res) {
  try {
    const s = fs.createReadStream("assets/images/" + req.query.imageName)
    s.on("open", () => {
      res.set("content-type", "image/jpeg")
      s.pipe(res)
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

module.exports = { getImage }
