const express = require("express")
const app = express()

const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const expressFileUpload = require("express-fileupload")

const http = require("http").createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())
app.use(expressFileUpload())
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "docker"
) {
  app.use(express.static(path.resolve(__dirname, "public")))
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

const authRoutes = require("./api/auth/auth.routes")
const userRoutes = require("./api/user/user.routes")
const stayRoutes = require("./api/stay/stay.routes")
const orderRoutes = require("./api/order/order.routes")
const assetsRoutes = require("./api/assets/assets.routes")

const { setupSocketAPI } = require("./services/socket.service")
setupSocketAPI(http)

// routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/stay", stayRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/assets", assetsRoutes)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

const logger = require("./services/logger.service")

const port = process.env.PORT || 3030

http.listen(port, () => {
  logger.info("Server is running on port: " + port)
})
