const express = require("express");
const urlencoded = require("body-parser").urlencoded;
const routes = require("./routes");
const db = require("./models");

const app = express();
app.use(urlencoded({ extended: false }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// load routes
routes(app);

const PORT = 3000;

// Create an HTTP server and listen for requests on port 3000
app.listen(process.env.PORT || PORT, () => {
  console.log("Now listening on port 3000. ");
});
