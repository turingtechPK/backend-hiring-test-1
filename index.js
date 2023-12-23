/**
 * Project Name: Backend TuringTech Test
 * Description: The purpose of the test is to reproduce one small feature: call forwarding.
 *
 * Author: Tayyab Ashraf
 * Email: tayyabashraf22@gmail.com
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import Database from './config/db.js';
import {notFound, errorHandler} from './middlewares/errors/error.js'


/*    Routes Imports   */
import callCenterRoutes from "./routes/callCenter.route.js";

dotenv.config();

/*  Swagger Configuration   */
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Call Center API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);


const app = express();
const PORT = process.env.PORT || 5000;

/*   DB Configuration    */
const db = new Database(process.env.MONGO_URL);
  
await db.connect().catch((err) =>{
    console.error("Error connecting to database:", err);
    process.exit(1);   
});
  
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*    Routes Configuration    */
app.get("/api/server-status", (req, res) => {
    res.json({ message: "Server is up and running!" });
});

app.use("/turing-tech/", callCenterRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

/*    Error Handling   */
app.use(errorHandler);
app.use(notFound);

  
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}!`));
