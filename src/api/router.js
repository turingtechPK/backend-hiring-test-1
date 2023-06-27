const express = require('express');
const { handleCall, gatherResponse, recordVoiceMail } = require('./incomingCall');

const router = express.Router();

router.use(handleCall);

router.use(recordVoiceMail);
router.use(gatherResponse);
// router.use(handleDigit)
module.exports = router;
