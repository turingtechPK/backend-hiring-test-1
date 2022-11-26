import express from "express";
import * as callService from "../service/call.service";

/**
 * inbound call receiver controller
 *
 * @param req express request object
 * @param res express response object
 */
export async function inboundCall(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  try {
    const incomingCallResponse = await callService.inboundCall();

    // Render the response as XML in reply to the webhook request
    res.type("text/xml");
    return res.send(incomingCallResponse);
  } catch (err) {
    console.error(
      "[callController][inboundCall] Unable to provide welcome message to inbound call"
    );
    return res.status(500).json({ message: err.message });
  }
}

/**
 * Gather input from user
 * @param req express request object
 * @param res express response object
 */
export async function gatherInput(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  try {
    const inputResponse = await callService.gatherInput(req.body.Digits);
    // Render the response as XML in reply to the webhook request
    res.type("text/xml");
    return res.send(inputResponse);
  } catch (err) {
    console.error("[callController][gatherInput] Unable to user input");
    return res.status(500).json({ message: err.message });
  }
}

/**
 * end call for user
 * @param req express request object
 * @param res express response object
 * @returns
 */
export async function endCall(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  try {
    await callService.endCall();
    // Render the response as XML in reply to the webhook request
    res.type("text/xml");
    return res.status(200).send();
  } catch (err) {
    console.error("[callController][endCall] Unable to end call");
    return res.status(500).json({ message: err.message });
  }
}

/**
 * save status of call
 * @param req express request object
 * @param res express response object
 * @returns
 */
export async function statusChange(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  try {
    await callService.statusChange(req.body);
    // Render the response as XML in reply to the webhook request
    res.type("text/xml");
    return res.status(200).send();
  } catch (err) {
    console.error(
      "[callController][statusChange] Unable to change status of call"
    );
    return res.status(500).json({ message: err.message });
  }
}

/**
 * activity feed
 * @param req express request object
 * @param res express response object
 * @returns
 */
export async function getCalls(
  req: express.Request,
  res: express.Response
): Promise<express.Response> {
  try {
    const calls = await callService.getCalls();

    return res.status(200).json(calls);
  } catch (err) {
    console.error("[callController][getCalls] Unable to get calls");
    return res.status(500).json({ message: err.message });
  }
}
