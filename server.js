const http = require("http")
const app = require("./main")

const PORT = process.env.PORT || 8080

const server = http.createServer(app)

server.listen(PORT)