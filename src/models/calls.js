const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Call = sequelize.define('Call', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  caller: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.BIGINT,
  },
  audioFileLink: {
    type: DataTypes.STRING,
  },
});

module.exports = Call;
