import { BaseResponse } from './base-response';

export class AppResponse<T> extends BaseResponse<T> {
  public static Ok<T>(data?: T): AppResponse<T> {
    return new AppResponse<T>(true, 'Request Processed Successfully!', data);
  }

  public static Err<T>(message: string | { [key: string]: any }): AppResponse<T> {
    return new AppResponse<T>(false, message);
  }

  public static OkWithMessage<T>(message: string, data?: T): AppResponse<T> {
    return new AppResponse<T>(true, message, data);
  }
}
