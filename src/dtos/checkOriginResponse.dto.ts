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
}

export class FailureResponse {
  errorMessage: string;
}
