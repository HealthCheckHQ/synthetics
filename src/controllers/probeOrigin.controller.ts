import { CheckOriginRequest } from '@/dtos/checkOriginRequest.dto';
import { ProbeOriginService } from '@/services/probeOrigin.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class ProbeOriginController {

  private probeOriginService: ProbeOriginService  = Container.get(ProbeOriginService);

  public probeOrigin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const checkOriginRequest: CheckOriginRequest = req.body;
        const response = await this.probeOriginService.hitOrigin(checkOriginRequest);
        res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
