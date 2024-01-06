const Sequelize = require('sequelize');
require('dotenv');
const fs = require('fs');
const path = require('path');
const config = require('../dbs-config/config')
const basename = path.basename(__filename);
let dbPath = config.databases["Database1"];
const db = {};

const sequelize = new Sequelize(
  `${process.env.DB}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  dbPath,
  {
    pool: {
      logging: false,
      max: 30,
      min: 0,
      acquire: 120000,
      idle: 10000,
      evict: 1000
    }
  },
);

// read models in models folder

fs.readdirSync(path.join(__dirname, ''))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) == '.js'
  )
  // require each model in and return in map
  .forEach((file) => {
    try {
      const model = require(path.join(__dirname, `/${file}`))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    } catch (err) {
      console.log(
        `------->>>>>>>>   Cant Create Model ${file} Due to -->>>`,
        err
      );
    }
  });

const {
  calls
} = db;


db.sequelize = sequelize;
db.Sequelize = Sequelize;
// // sync models

module.exports = db;
