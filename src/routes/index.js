//use this file to define every controller and router connection

const express = require("express"),
    voiceCallController = require('../controller/voiceCallController')
router = express.Router();

require('../routes/voice')(router, voiceCallController)
module.exports = router;