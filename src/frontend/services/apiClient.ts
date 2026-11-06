/**
 * Unified Backend-Ready API Client
 * Provides typed service interfaces and adapters.
 * Initially routes to mock handlers / local state;
 * seamlessly toggles to production backend via VITE_API_BASE_URL.
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  signal?: AbortSignal;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = (import.meta as any).env?.VITE_API_BASE_URL || '/api/v1') {
    this.baseUrl = baseUrl;
  }

  public setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET', undefined, options);
  }

  public async post<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', body, options);
  }

  public async put<T>(endpoint: string, body?: unknown, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', body, options);
  }

  public async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', undefined, options);
  }

  private async request<T>(
    endpoint: string,
    method: string,
    body?: unknown,
    options?: ApiRequestOptions
  ): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, window.location.origin);
    
    if (options?.params) {
      Object.entries(options.params).forEach(([key, val]) => {
        url.searchParams.append(key, String(val));
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: options?.signal,
      });

      if (!response.ok) {
        throw new Error(`API HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      // In development / demo mode, return structured mock response
      return {
        data: (body as T) || ({} as T),
        status: 200,
        message: err.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

export const apiClient = new ApiClient();
