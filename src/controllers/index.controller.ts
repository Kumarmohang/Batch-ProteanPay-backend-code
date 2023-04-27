import { NextFunction, Request, Response } from 'express';

/**
 * This class Contains method of Home Page
 *
 * @class
 */
class IndexController {
  /**
   * @param _req as request
   * @param res as response
   * @param next as function passing parameters to next
   * @function
   * @returns This return response of 200 when hit to "/" route else send error to next middleware
   */
  public index = (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: 'Home Route' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
