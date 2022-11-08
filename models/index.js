const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;

module.exports = db;
