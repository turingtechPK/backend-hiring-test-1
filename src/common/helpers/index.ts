import { ApiResponse, ApiResponseStatus, HttpException } from "../interfaces";

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
