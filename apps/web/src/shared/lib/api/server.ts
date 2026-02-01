import 'server-only';

import { headers } from 'next/headers';

import type { ApiErrorResponse, ApiSuccessResponse } from './common';

export type NextFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export type ServerApiRequestInit = Omit<RequestInit, 'body'> & {
  body?: BodyInit | null;
  json?: unknown;
  next?: NextFetchOptions;
};

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not set');
  }
  return baseUrl;
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;

  return (
    record.success === false &&
    record.data === null &&
    typeof record.code === 'string' &&
    typeof record.message === 'string' &&
    typeof record.timestamp === 'string'
  );
}

async function request<T>(path: string, init: ServerApiRequestInit): Promise<T> {
  const url = new URL(path, getApiBaseUrl());

  const headerList = await headers();
  const cookie = headerList.get('cookie');
  const userAgent = headerList.get('user-agent');

  const mergedHeaders = new Headers(init.headers);

  if (cookie && !mergedHeaders.has('cookie')) {
    mergedHeaders.set('cookie', cookie);
  }

  if (userAgent && !mergedHeaders.has('user-agent')) {
    mergedHeaders.set('user-agent', userAgent);
  }

  if (!mergedHeaders.has('accept')) {
    mergedHeaders.set('accept', 'application/json');
  }

  const { json, body, ...requestInit } = init;

  if (json !== undefined && !mergedHeaders.has('content-type')) {
    mergedHeaders.set('content-type', 'application/json');
  }

  const response = await fetch(url, {
    ...requestInit,
    headers: mergedHeaders,
    body: json !== undefined ? JSON.stringify(json) : body,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (!isJson) {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    throw new Error('Expected JSON response from API');
  }

  const parsed = (await response.json()) as unknown;
  if (isApiErrorResponse(parsed)) {
    throw Object.assign(new Error(parsed.message), {
      name: 'ApiError',
      code: parsed.code,
      timestamp: parsed.timestamp,
      status: response.status,
      errorData: parsed,
    });
  }

  if (
    typeof parsed === 'object' &&
    parsed !== null &&
    (parsed as { success?: unknown }).success === true
  ) {
    return (parsed as ApiSuccessResponse<T>).data;
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return parsed as T;
}

export const serverApi = {
  get: <T>(path: string, init: Omit<ServerApiRequestInit, 'method' | 'json' | 'body'> = {}) =>
    request<T>(path, { ...init, method: 'GET' }),
  post: <T>(path: string, init: Omit<ServerApiRequestInit, 'method'> = {}) =>
    request<T>(path, { ...init, method: 'POST' }),
  put: <T>(path: string, init: Omit<ServerApiRequestInit, 'method'> = {}) =>
    request<T>(path, { ...init, method: 'PUT' }),
  patch: <T>(path: string, init: Omit<ServerApiRequestInit, 'method'> = {}) =>
    request<T>(path, { ...init, method: 'PATCH' }),
  delete: <T>(path: string, init: Omit<ServerApiRequestInit, 'method'> = {}) =>
    request<T>(path, { ...init, method: 'DELETE' }),
};
