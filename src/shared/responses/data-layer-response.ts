import { BaseResponse } from './base-response';

export class DataLayerResponse<T> extends BaseResponse<T> {
  public static Empty<T>(): DataLayerResponse<T> {
    return new DataLayerResponse<T>(false, 'No data found');
  }

  public static NotFound<T>(): DataLayerResponse<T> {
    return new DataLayerResponse<T>(false, 'Resource not found');
  }

  public static SQLError<T>(): DataLayerResponse<T> {
    return new DataLayerResponse<T>(false, 'Database query error');
  }

  public static Ok<T>(data?: T): DataLayerResponse<T> {
    return new DataLayerResponse<T>(true, 'Data retrieved successfully', data);
  }

  public static Created<T>(data?: T): DataLayerResponse<T> {
    return new DataLayerResponse<T>(true, 'Resource created successfully', data);
  }

  public static AlreadyExists<T>(): DataLayerResponse<T> {
    return new DataLayerResponse<T>(false, 'Resource already exists');
  }

  public static Deleted<T>(): DataLayerResponse<T> {
    return new DataLayerResponse<T>(true, 'Resource deleted successfully');
  }

  public static Updated<T>(): DataLayerResponse<T> {
    return new DataLayerResponse<T>(true, 'Resource updated successfully');
  }

  public static Generic<T>(message: string): DataLayerResponse<T> {
    return new DataLayerResponse<T>(false, message);
  }
}
