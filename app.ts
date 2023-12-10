import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/database"
import callRoutes from "./src/routes/calls.route"

dotenv.config()

var app = express()


// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 8000);
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/call", callRoutes);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
