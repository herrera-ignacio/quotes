import { Router } from 'express';
import { IndexController } from '../../controllers/index';
import { Route } from '../../interfaces';

export class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public controller = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.controller.index)
  }
}
