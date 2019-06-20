const express = require("express")
const bodyParser = require("body-parser")
const log = require("./routes/log")
const app = express()

app.set('secretKey', 'nodeRestApi') // jwt secret token

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization, password, email, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
    res.header("Access-Control-Expose-Headers", "Authorization")

    next()
})

app.use("/", log)

app.use((req, res, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app