import { NextFunction, Request, Response } from 'express';

export class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
