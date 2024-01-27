import { Response } from "express";
import { ApiRequest } from "../common/interfaces";
import * as callLogsService from "../services/call-logs";
import { buildSuccessResponse } from "../common/helpers";

/**
 * @swagger
 * /call-logs:
 *  get:
 *    summary: Get All Call Logs
 *    description: Get All Call Logs
 *    responses:
 *      '200':
 *            description: A successful response
 */
export const getAllCallLogs = async (req: ApiRequest, res: Response) => {
  const data = await callLogsService.getAllCallLogs();
  res.send(buildSuccessResponse(data));
};

/**
 * @swagger
 * /call-logs/{id}:
 *  get:
 *    summary: Get Call By Id
 *    description: Get Call By Id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Call Id
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *            description: A successful response
 */
export const getCallById = async (req: ApiRequest, res: Response) => {
  const data = await callLogsService.getCallById(req.params.id);
  res.send(buildSuccessResponse(data));
};
