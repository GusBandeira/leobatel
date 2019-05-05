const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use('/uploads', express.static('uploads'))
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server