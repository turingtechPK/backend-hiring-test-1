import express, { Request, Response, NextFunction, Application } from "express";

const middlewares = require("./middlewares");
const connection = require("./database");
import router from "../routes";

// Create Express server
const app: Application = express();
app.use(express.json());

// Connect to database
connection();

// Include middlewares
app.use(middlewares);

//ALL THE API ROUTES

/**
 * @swagger
 * /:
 *  get:
 *    summary: Use to test the server
 *    description: Test the server if its running or not
 *    responses:
 *      '200':
 *            description: A successful response
 */
app.get("/", (req: Request, res: Response) => {
  res.send("App Running");
});

app.use("/api/", router);


// CORS
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "access-control-allow-headers": "*",
    "Access-Control-Allow-Methods": "*",
  });
  next();
});

export default app;
