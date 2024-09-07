import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CheckOriginRequest } from '@/dtos/checkOriginRequest.dto';
import { ProbeOriginController } from '@/controllers/probeOrigin.controller';

export class ProbeOriginRoute implements Routes {
  public router = Router();
  public probeOriginController = new ProbeOriginController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/probe', [AuthMiddleware, ValidationMiddleware(CheckOriginRequest)], this.probeOriginController.probeOrigin);
  }
}
