/********************************************************************************
 * The project is available online at: https://alert-ox-cowboy-boots.cyclic.app *
 ********************************************************************************/
// Framework
let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();

// middleware
let cookieParser = require("cookie-parser");
const port = process.env.PORT || 4001;
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Connecting to Mongo database
mongoose.set("debug", false);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("database connected successfully");
    },
    (error) => {
      console.log("database connection failed");
      console.log(error);
    }
  );

app.use(cookieParser());

// starting Backend server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});

app.get("/", (req, res) => res.send("Hello World"));

function startTime(req, res, next) {
  req.call = { startTime: new Date() };
  next();
}

const callsRoutes = require("./src/routes/calls.routes");
app.use("/call", startTime, callsRoutes);

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  if (!err.statusCode) err.statusCode = 500;
  return res.status(err.statusCode).send("Error 404");
});
