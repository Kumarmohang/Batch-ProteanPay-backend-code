/**
 * Response handler class
 *
 */
export default class Response {
  /**
   * Static method to return success response
   *
   * @param res - response object
   * @param data - data sent as reponse to api
   * @param status - status code
   * @returns success response json object
   */
  static success(res, data, status = 200) {
    res?.status?.(status);
    if (data && data.rows) {
      return res.status(status).json({
        data: {
          results: data.rows,
          total: data.count,
        },
      });
    }
    return res.status(status).json({
      data: data,
      statusCode: status,
    });
  }

  /**
   * Static method to return success response
   *
   * @param res - response object
   * @param error - api error sent as response
   * @param status - status code
   * @returns failure response json object
   */
  static error(res, error, status = 400) {
    const response = {
      message: error.message,
      errorCode: error.errorCode,
    };
    if (status === 400) {
      response.field = error.errors;
    }
    res.status(status);
    return res.json(response);
  }
}
