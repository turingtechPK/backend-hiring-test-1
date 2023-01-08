/* eslint-disable no-unused-vars */
const db = require('../models')

const callHistoryController = async () => {
  try {
    const data = await db.CallLogs.findAll()
    return data
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  callHistoryController,
}
