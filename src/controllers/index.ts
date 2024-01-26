import { Response } from "express";

import { ApiRequest } from "../common/interfaces";
import { buildSuccessResponse } from "../common/helpers";
import * as homeServices from "../services/index";


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
export const helloFromServer = async (req: ApiRequest, res: Response) => {
  const data = homeServices.helloFromServer();
  res.json(buildSuccessResponse(data));
};
