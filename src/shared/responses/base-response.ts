export class BaseResponse<T> {
  constructor(
    public success: boolean,
    public message?: string | { [key: string]: any },
    public data?: T,
  ) {}
}
