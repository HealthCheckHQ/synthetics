import { NextFunction, Request, Response } from 'express';
import { SYNTHETICS_CONFIG } from '@config';
import { HttpException } from '@exceptions/httpException';

const isAuthorized = req => {
  const apiAuthVal = req.header(SYNTHETICS_CONFIG.apiAuthKey);
  if (apiAuthVal === SYNTHETICS_CONFIG.apiAuthValue) {
    return true;
  }
  return false;
};

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isValidRequest = isAuthorized(req);

    if (isValidRequest) {
      next();
    } else {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
