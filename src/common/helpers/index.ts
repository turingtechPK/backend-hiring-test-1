import { ApiResponse, ApiResponseStatus, HttpException, HttpStatus } from "../interfaces";

/**
 * All went well, and (usually) some data was returned.
 * @param data
 */
export const buildSuccessResponse = (data: unknown = null): ApiResponse => ({
  status: ApiResponseStatus.SUCCESS,
  data,
});

/**
 * There was a problem with the data submitted, or some pre-condition of the API call wasn't satisfied
 * @param data
 */
export const buildFailResponse = (data: unknown): ApiResponse => ({
  status: ApiResponseStatus.FAIL,
  data,
});

/**
 * An error occurred in processing the request, i.e. an exception was thrown
 * @param error
 */
export const buildErrorResponse = (error: Error): ApiResponse => {
  const body: ApiResponse = {
    status: ApiResponseStatus.ERROR,
    message:
      error instanceof HttpException
        ? error.message
        : "There was a problem, please try again later.",
    ...(error instanceof HttpException && error.errors
      ? { errors: error.errors }
      : {}),
  };

  return body;
};

/**
 * Helps validates receiving a number of mandatory request query params
 * @param qParams the query params object received by request object
 * @param mandatoryQParams a list containing all key values that should have the query params object
 */
export const validateMandatoryQueryParams = <T extends object>(
  qParams: T,
  mandatoryQParams: (keyof Partial<T>)[] = []
): void | never => {
  mandatoryQParams.forEach((param) => {
    if (!qParams.hasOwnProperty(param)) throw new BadRequestException(`${String(param)} query parameter is mandatory`);
  });
};

/**
 * Helps validates receiving a number of mandatory request body params. Throws BadRequestException if any of the mandatory
 * params are missing. This may be removed/replaced by a bigger and more complex validation library (made by us).
 * @param body the body object received by request object
 * @param mandatoryBodyParams a list containing all key values that should have the body object
 */
export const validateMandatoryBodyParams = <T extends object>(
  body: T,
  mandatoryBodyParams: (keyof Partial<T>)[] = []
): void | never => {
  mandatoryBodyParams.forEach((param) => {
    if (!body.hasOwnProperty(param)) throw new BadRequestException(`${String(param)} is required.`);
  });
};

export class BadRequestException extends HttpException {
  constructor(message = 'Bad Request', errors?: any) {
    super(HttpStatus.BAD_REQUEST, message, errors);
  }
}
