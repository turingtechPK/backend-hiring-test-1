const express = require('express')
const routes = express.Router()
const twilioRoute = require('./twilioRoute')

routes.use('/twilio', twilioRoute)
module.exports = routes
