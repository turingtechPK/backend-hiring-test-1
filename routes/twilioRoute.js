const express = require('express')
const twilioRoute = express.Router()
const VoiceResponse = require('twilio').twiml.VoiceResponse
const { selectOptions, insertData } = require('../controllers/twilioController')
const {
  callHistoryController,
} = require('../controllers/callHistoryController')

twilioRoute.post('/voice', async function (req, res) {
  try {
    // res.type('xml')
    function changeBodyCallStatus() {
      req.body.CallStatus = 'completed'
    }
    const twiml = new VoiceResponse()

    function gather() {
      const gatherNode = twiml.gather({ numDigits: 1 })
      gatherNode.say(
        'Press 1 for Call forwarding to an other Person. Press 2 For leave a voicemail'
      )
      twiml.redirect('/api/twilio/result')
    }

    if (req.body.Digits) {
      const { Digits } = req.body
      selectOptions(Digits, changeBodyCallStatus, gather, twiml)
    } else {
      gather()
    }
    if (req.body && req.body.CallStatus == 'completed') {
      await insertData(req.body)
    }
    res.type('text/xml')
    res.writeHead(200, { 'Content-Type': 'text/xml' })
    res.end(twiml.toString())
  } catch (err) {
    console.log('err', err)
  }
})

twilioRoute.get('/getHistory', async function (req, res) {
  try {
    const data = await callHistoryController()
    if (!data) {
      res.status(401).send({
        message: 'Data Empty',
      })
    }
    res.status(200).send({
      message: 'succesfully Recvied',
      data,
    })
  } catch (err) {
    res.status(401).send({
      message: 'Error Occured',
    })
  }
})

twilioRoute.all('/result', function (req, res) {
  console.log('for invalid selection', JSON.stringify(req.body.Digits))
})

module.exports = twilioRoute
