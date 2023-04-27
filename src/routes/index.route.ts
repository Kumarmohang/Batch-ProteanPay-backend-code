import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

/**
 * IndexRoute class
 *
 * @implements {Routes}
 */
class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  /**
   *
   * constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * this function init all routes related to index controller
   *
   * @returns {void } nothing
   */
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
