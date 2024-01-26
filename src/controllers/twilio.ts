import { Response } from "express";
import { ApiRequest, HandleCallEndBody, HandleUserInputBody, HandleVoicemailBody } from "../common/interfaces";
import * as twilioServices from "../services/twilio";
import { validateMandatoryBodyParams, validateMandatoryQueryParams } from "../common/helpers";

/**
 * @swagger
 * /voice:
 *  get:
 *    summary: Handle Incoming Call
 *    description: Attend call and record the message
 *    responses:
 *      '200':
 *            description: A successful response
 */
export const handleCall = async (req: ApiRequest, res: Response) => {
  validateMandatoryQueryParams(req.query, ["CallSid", "From"]);
  const data = await twilioServices.handleCall(req.query.CallSid, req.query.From);
  res.type("text/xml");
  res.send(data.toString());
};

/**
 * @swagger
 * /handleUserInput:
 *  post:
 *    summary: Handle User Input
 *    description: Handle User Input
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              Digits:
 *                type: string
 *                description: Digit pressed by user
 *    responses:
 *      '200':
 *            description: A successful response
 */
export const handleUserInput = async (req: ApiRequest<HandleUserInputBody>, res: Response) => {
  validateMandatoryBodyParams(req.body, ["Digits"])
  validateMandatoryQueryParams(req.query, ["callId"]);
  const data = await twilioServices.handleUserInput(req.body.Digits, req.query.callId);
  res.type("text/xml");
  res.send(data.toString());
};

/**
 * @swagger
 * /handleVoicemail:
 *  post:
 *    summary: Handle Voicemail
 *    description: Handle Voicemail
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              RecordingUrl:
 *                type: string
 *                description: Recording Url
 *              CallSid:
 *                type: string
 *                description: Call Sid
 *    responses:
 *      '200':
 *            description: A successful response
 */
export const handleVoicemail = async (req: ApiRequest<HandleVoicemailBody>, res: Response) => {
  validateMandatoryQueryParams(req.body, ["RecordingUrl", "CallSid"]);
  const data = await twilioServices.handleVoicemail(req.body.RecordingUrl, req.body.CallSid);
  res.type("text/xml");
  res.send(data.toString());
}

/**
 * @swagger
 * /handleCallEnd:
 *  post:
 *    summary: Handle Call End
 *    description: Handle Call End
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              CallSid:
 *                type: string
 *                description: Call Sid
 *    responses:
 *      '200':
 *            description: A successful response
 */
export const handleCallEnd = async (req: ApiRequest<HandleCallEndBody>, res: Response) => {
  validateMandatoryQueryParams(req.body, ["CallSid"]);
  const data = await twilioServices.handleCallEnd(req.body.CallSid);
  res.type("text/xml");
  res.send(data.toString());
}
