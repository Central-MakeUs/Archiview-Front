import { HTTPError } from 'ky';

/* eslint-disable-next-line @typescript-eslint/naming-convention */
export interface ApiSuccessResponse<T> {
  success: boolean;
  data: T;
  code: string;
  message: string;
  timestamp: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ApiErrorResponse {
  success: boolean;
  // eslint-disable-next-line  @rushstack/no-new-null
  data: null;
  code: string;
  message: string;
  timestamp: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
export type KyHttpError = HTTPError<ApiErrorResponse>;
export type ExtendedKyHttpError = KyHttpError & { errorData?: ApiErrorResponse };
