// src/controllers/activityFeedController.js
const { Call } = require('../models/callModel');

const getActivityFeed = async (req, res) => {
  try {
    const activityFeed = await Call.find().sort({ startTime: -1 });
    res.json(activityFeed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getActivityFeed };
