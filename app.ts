import express from "express"
import dotenv from 'dotenv'
import connectDB from "./config/database"
import callRoutes from "./src/routes/calls.route"
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import cors from 'cors'

dotenv.config()

var app = express()


// Connect to MongoDB
connectDB();

// Express configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set("port", process.env.PORT || 8000);
app.use(express.json())
app.use(cors({
  origin: "*"
}))
app.use(express.urlencoded({ extended: false }))

app.use("/call", callRoutes);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
