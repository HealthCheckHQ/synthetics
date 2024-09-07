import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { HealthCheckController } from '@/controllers/healthcheck.controller';

export class HealthRoute implements Routes {
  public router = Router();
  public healthCheckController = new HealthCheckController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/health', AuthMiddleware ,this.healthCheckController.validatedHealthCheck);
    this.router.get('/' ,this.healthCheckController.healthCheck);
  }
}
