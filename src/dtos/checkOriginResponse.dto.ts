import { Timings } from '@szmarczak/http-timer';

export class CheckOriginResponse {
  success: boolean;
  timeElapsed: number;
  startTime: string;
  endTime: string;
  successResponse?: SuccessResponse;
  failureResponse?: FailureResponse;
}

export class SuccessResponse {
  statusCode: number;
  headers: any;
  body: any;
  timings?: Timings;
}

export class FailureResponse {
  errorMessage: string;
  timings?: Timings;
}
