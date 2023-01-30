const express = require('express');
const { AudioCallController } = require('../controllers');

const router = express.Router();

router.post('/connect', AudioCallController.connect);
router.post('/input', AudioCallController.input);
router.post("/end", AudioCallController.end);
router.post("/status", AudioCallController.status);
router.get("/logs", AudioCallController.logs);

module.exports = router;
