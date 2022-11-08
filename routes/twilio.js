const express = require("express");
const router = express.Router();
const twilioController = require("../controllers/twilioController");

router.route("/voice").post(twilioController.voice);
router.route("/gather").post(twilioController.gather);
router.route("/goodbye").post(twilioController.goodbye);
router.route("/status").post(twilioController.status);
router.route("/calllogs").get(twilioController.calllogs);

module.exports = router;
