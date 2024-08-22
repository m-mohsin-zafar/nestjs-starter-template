import { BaseResponse } from './base-response';
import { PaginationInfo } from '../types/pagination.type';

export class PaginatedResponse<T> extends BaseResponse<T[]> {
  constructor(
    public success: boolean,
    public message: string,
    public data: T[],
    public paginationInfo: PaginationInfo,
  ) {
    super(success, message, data);
  }

  public static Ok<T>(data: T[], paginationInfo: PaginationInfo): PaginatedResponse<T> {
    return new PaginatedResponse<T>(true, 'Data retrieved successfully', data, paginationInfo);
  }

  public static Empty<T>(paginationInfo: PaginationInfo): PaginatedResponse<T> {
    return new PaginatedResponse<T>(false, 'No data found', [], paginationInfo);
  }
}
