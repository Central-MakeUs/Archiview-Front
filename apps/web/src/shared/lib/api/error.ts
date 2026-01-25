import type { ApiErrorResponse } from './common';

export class ApiError extends Error {
  public readonly code: string;
  public readonly timestamp: string;

  public constructor(errorData: ApiErrorResponse) {
    super(errorData.message);
    this.name = 'ApiError';
    this.code = errorData.code;
    this.timestamp = errorData.timestamp;
  }
}
