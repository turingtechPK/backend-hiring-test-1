const express = require("express");
const twilio = require("./twilio");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/twilio", twilio);
};
