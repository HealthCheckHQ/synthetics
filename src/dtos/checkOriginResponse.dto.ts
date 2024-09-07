export class CheckOriginResponse{
  success: boolean;
  timeElapsed: number;
  successResponse? : SuccessResponse;
  failureResponse? : FailureResponse;
  
}

export class SuccessResponse{
  statusCode: number;
  headers: any;
  body: any;
}

export class FailureResponse{
  errorMessage: string;
}