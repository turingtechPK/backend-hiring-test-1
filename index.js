// module import 
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

// app init
const app = express();
const ivr = require("./routes/IVRRoutes")

// default port
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/ivr" ,ivr)

//only to check server if live
app.get("/",(req,res)=>{
    console.log("hello test",req.body);

    res.json({ success: "API Started"});
});

// setting up mongodb connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Create an HTTP server 
app.listen(PORT, () => {
    console.log(`Now listening on port ${process.env.PORT}. `);
  });