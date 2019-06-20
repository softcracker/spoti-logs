const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const multiparty = require('multiparty')
const { consumer } = require('../config')

const validateUser = (req, res) => {
    try {
        let auth = false
        const header = req.headers['authorization']

        if (typeof header !== 'undefined') {
            const token = header.split(' ')[1]

            jwt.verify(token, req.app.get('secretKey'), err => {
                if (err) {
                    throw new Error("Invalid key.")
                } else {
                    auth = true
                }
            })

        } else {
            throw new Error("Key required")
        }
        return auth
    } catch (err) {
        res.sendStatus(400)
        return false
    }
}

router.post("/auth", async (req, res) => {
    try {
        if (req.body.password == consumer.PASSWORD && req.body.email == consumer.EMAIL) {
            const token = jwt.sign({ id: 123 }, req.app.get('secretKey'), { expiresIn: '1h' })
            res.json({ status: "success", message: "user found!!!", token: token })
        } else {
            throw new Error()
        }
    } catch (error) {
        res.sendStatus(403)
    }
})

router.post('/upload', (req, res, next) => {
  const form = new multiparty.Form()

  form.parse(req, (err, fields, files) => {
      res.writeHead(200, {'content-type': 'text/plain'})
      res.write('received upload:\n\n')
      res.end(util.inspect({fields: fields, files: files}))
  })
  form.on('file', (name,file) => {
      console.log(file)
      console.log(name)
  })
})

router.post("/", async (req, res) => {
    try {
        if (validateUser(req, res)) {
            const log = req.body.logfile
            res.json({status: "success"})
            console.log(log)
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router
