import axios from 'axios';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { CheckOriginRequest } from '@/dtos/checkOriginRequest.dto';
import { AuthenticationType } from '@/enums/authenticationType.enum';
import { CheckOriginResponse } from '@/dtos/checkOriginResponse.dto';
import { SYNTHETICS_CONFIG } from '@/config';

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
      const response = await axios({
        url: requestUrl,
        method: originRequest.requestType,
        headers: {
          ...originRequest.headers,
          'User-Agent': `HealthcheckHQ/synthetic/${location || SYNTHETICS_CONFIG.location || 'default'}`,
          ...(originRequest.authentication === AuthenticationType.BEARER && { Authorization: `Bearer ${originRequest.token}` }),
        },
        data: originRequest.body,
        timeout: originRequest.timeout,
        maxRedirects: originRequest.followRedirect ? 10 : 0,
        auth: {
          ...(originRequest.authentication === AuthenticationType.BEARER && { username: originRequest.userName, password: originRequest.password }),
        },
      });
      const endTime = Date.now();
      return {
        success: true,
        timeElapsed: endTime - startTime,
        successResponse: { statusCode: response.status, headers: response.headers, body: response.data },
      };
    } catch (error) {
      const endTime = Date.now();
      if (error.response) {
        return {
          success: true,
          timeElapsed: endTime - startTime,
          successResponse: { statusCode: error.response.status, headers: error.response.headers, body: error.response.data },
        };
      } else if (error.request) {
        return {
          success: false,
          timeElapsed: endTime - startTime,
          failureResponse: { errorMessage: `Request was initialzed but no response was received: ${error.message}` },
        };
      } else {
        return {
          success: false,
          timeElapsed: endTime - startTime,
          failureResponse: { errorMessage: error.message },
        };
      }
    }
  }
}
