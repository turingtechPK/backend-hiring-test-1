import express from "express";
import * as core from "express-serve-static-core";
import * as callController from "../controller/call.controller";

const router = express.Router();

/**
 * express router for calls
 */
export function routes(): core.Router {
  router.route("/api/v1/call/voice").post(callController.inboundCall);

  router.route("/api/v1/call/gather").post(callController.gatherInput);

  router.route("/api/v1/end-call").post(callController.endCall);

  router.route("/api/v1/call/status-change").post(callController.statusChange);

  router.route("/api/v1/call").get(callController.getCalls);
  return router;
}
