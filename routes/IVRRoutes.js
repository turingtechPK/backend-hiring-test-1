const express = require("express");
const router = express.Router();

const {callStart,assistance,AddCallLog,RetrieveCalLogs,CustomerSupport} =require("../Controller/IVRController");

router.post("/start",callStart);
router.post("/assistance",assistance);
router.post("/addCallLog",AddCallLog);
router.get("/retrieve",RetrieveCalLogs);
router.post("/customerSupport",CustomerSupport);


module.exports = router;