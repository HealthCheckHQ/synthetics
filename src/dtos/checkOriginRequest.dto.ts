import { AuthenticationType } from '@/enums/authenticationType.enum';
import { RequestType } from '@enums/requestType.enum';
import { IsEnum, IsObject, ValidateNested, IsUrl, IsBoolean, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CheckOriginRequest {
  @IsEnum(RequestType)
  public requestType: RequestType;
  
  @IsUrl()
  public url: string;

  @IsEnum(AuthenticationType)
  public authentication: AuthenticationType;

  @IsNumber()
  @Min(1000)
  @Max(60000)
  public timeout: number;

  @IsOptional()
  @IsObject()
  public queryParams?: Record<string, string>;

  @IsOptional()
  @IsObject()
  public headers?: Record<string, string>;

  @IsBoolean()
  public followRedirect: boolean;

  @IsOptional()
  public body?: object;

  @IsOptional()
  public token?: string;

  @IsOptional()
  public userName?: string;

  @IsOptional()
  public password?: string;

}
