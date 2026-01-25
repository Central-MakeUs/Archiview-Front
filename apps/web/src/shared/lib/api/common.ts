/* eslint-disable-next-line @typescript-eslint/naming-convention */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  // eslint-disable-next-line  @rushstack/no-new-null
  message: null;
  timestamp: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ApiErrorResponse {
  success: false;
  // eslint-disable-next-line  @rushstack/no-new-null
  data: null;
  code: string;
  message: string;
  timestamp: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
