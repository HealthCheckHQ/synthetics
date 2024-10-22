import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { CheckOriginRequest } from '@/dtos/checkOriginRequest.dto';
import { AuthenticationType } from '@/enums/authenticationType.enum';
import { CheckOriginResponse } from '@/dtos/checkOriginResponse.dto';
import { SYNTHETICS_CONFIG } from '@/config';
import got from 'got';

@Service()
export class ProbeOriginService {
  public async hitOrigin(originRequest: CheckOriginRequest, location: string): Promise<CheckOriginResponse> {
    if (originRequest.authentication === AuthenticationType.BASIC) {
      if (!(originRequest.userName && originRequest.password)) {
        throw new HttpException(400, 'Basic Authentication needs both username and password');
      }
    }
    if (originRequest.authentication === AuthenticationType.BEARER) {
      if (!originRequest.token) {
        throw new HttpException(400, 'Bearer Authentication needs token');
      }
    }

    let requestUrl = originRequest.url;
    if (originRequest.queryParams) {
      requestUrl = `${requestUrl}? ${new URLSearchParams(originRequest.queryParams).toString()}`;
    }
    const startTime = Date.now();
    try {
      const response = await got({
        url: requestUrl,
        method: originRequest.requestType as any,
        headers: {
          ...originRequest.headers,
          'User-Agent': `HealthcheckHQ/synthetic/${location || SYNTHETICS_CONFIG.location || 'default'}`,
          ...(originRequest.authentication === AuthenticationType.BEARER && { Authorization: `Bearer ${originRequest.token}` }),
        },
        body: originRequest.body as any,
        timeout: originRequest.timeout,
        maxRedirects: originRequest.followRedirect ? 10 : 0,
        ...(originRequest.authentication === AuthenticationType.BASIC && { username: originRequest.userName, password: originRequest.password }),
      });
      const endTime = Date.now();
      return {
        success: true,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        timeElapsed: endTime - startTime,
        successResponse: { statusCode: response.statusCode, headers: response.headers, body: response.body, timings: response.timings },
      };
    } catch (error) {
      const endTime = Date.now();
      if (error.response) {
        return {
          success: true,
          timeElapsed: endTime - startTime,
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          successResponse: {
            statusCode: error.response.statusCode,
            headers: error.response.headers,
            body: error.response.body,
            timings: error.timings,
          },
        };
      } else if (error.request) {
        return {
          success: false,
          timeElapsed: endTime - startTime,
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          failureResponse: { errorMessage: `Request was initialzed but no response was received: ${error.message}`, timings: error.timings },
        };
      } else {
        return {
          success: false,
          timeElapsed: endTime - startTime,
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          failureResponse: { errorMessage: error.message, timings: error.timings },
        };
      }
    }
  }
}
