import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectMongoDB } from "./config/mongodb";
import mongoose from "mongoose";
import * as callRouter from "./call/router/call.router";
const app = express();

const BASE_PATH = "/backend-test";

connectMongoDB();

app.use(express.json());
app.use(cors({ origin: true }));

app.use(
  morgan(
    function (tokens, req, res) {
      return [
        tokens.method(req, res),
        "-",
        tokens.url(req, res),
        "-",
        "Query:",
        JSON.stringify(req.query),
        "-",
        "Body",
        JSON.stringify(req.body),
        "-",
        "Params",
        JSON.stringify(req.params),
        "-",
        "Status:",
        tokens.status(req, res),
        "-",
        "Response Time:",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    },
    {
      skip(req) {
        return req.originalUrl.includes("ping");
      },
    }
  )
);

app.use(BASE_PATH, callRouter.routes());

const APP_PORT = process.env.APP_PORT ? +process.env.APP_PORT : 3000;
app.listen(APP_PORT, () => {
  console.log(`App listening at http://localhost:${APP_PORT}`);
});

mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(
    "Ran Mongo Query",
    `${collectionName}.${method}`,
    JSON.stringify(query),
    doc
  );
});

process.on("SIGINT", () => {
  console.log("Received SIGINT - Terminating.");
  process.exit();
});
