/* eslint-disable no-unused-vars */
const db = require('../models')

const selectOptions = async (digit, changeBodyCallStatus, gather, twiml) => {
  switch (digit) {
    case '1':
      twiml.say('Your Call forwarding to an other Person!')
      twiml.dial('+923480152852')
      twiml.say('Good Bye!')
      changeBodyCallStatus()
      break
    case '2':
      twiml.say('Kindly leave a voicemail!')
      twiml.record({
        timeout: 5,
        transcribe: true,
      })
      break
    default:
      twiml.say("Sorry, I don't understand that choice.")
      twiml.pause()
      gather()
      break
  }

  return true
}

const insertData = async (data) => {
  await db.CallLogs.create(data)
  return true
}
module.exports = {
  selectOptions,
  insertData,
}
