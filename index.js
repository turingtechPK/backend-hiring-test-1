const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("express-async-errors");
require("dotenv").config();

const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_URI, () => {
  console.log("Database connected...!!!");
});

app.use("/api/v1", routes);

app.use((error, request, response, next) => {
  console.log(`error ${error.message}`);
  response.status(500).send(error.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
