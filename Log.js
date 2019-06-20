// Content of logging file, sends log to api

const axios = require('axios')
const {consumer} = require('./config')
const fs = require('fs')
const api = 'https://spoti-logs.herokuapp.com/'
const filepath = './test.txt'

const auth = async () => {
  const auth = {
    'email': consumer.EMAIL,
    'password': consumer.PASSWORD
  }
  const res = await axios.post(api + 'auth', auth)
  return res.data.token
}

const uploadLogs = () => {
  fs.readFile(filepath, 'utf8', async (err, data) => {
    console.log(data)
    await sendFile(data)
  })
}

const sendFile = async (logContent) => {
  const token = await auth()
  const obj = {
    'logfile': logContent
  }

  await axios.post(api, obj, {
    headers: {
      'Content-Type': 'application/json',
      "authorization": "Bearer " + token
    }
  })
  await fs.createWriteStream(__dirname + '/test.txt', {flags : 'w'});
}

uploadLogs()
module.exports = {
  uploadLogs
}
