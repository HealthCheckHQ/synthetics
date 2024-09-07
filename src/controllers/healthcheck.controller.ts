import { NextFunction, Request, Response } from 'express';

export class HealthCheckController {
  private upSince = new Date();
  public validatedHealthCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ status: 'OK', upSince: this.upSince});
    } catch (error) {
      next(error);
    }
  };
  public healthCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ status: 'OK'});
    } catch (error) {
      next(error);
    }
  };
}
