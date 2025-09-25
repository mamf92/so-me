const BASE_URL = 'https://v2.api.noroff.dev';

interface ApiOptions {
  body?: unknown;
  /** HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE'). Defaults to 'GET' or 'POST' if body is provided. */
  method?: string;
  /** Additional headers to include in the request. */
  headers?: Record<string, string>;
}

export interface ApiError {
  /** Array of error objects. */
  errors?: {
    /** Optional error code */
    code?: string;
    /** Required error message. */
    message: string;
    /** Optional path to the property that caused the error. */
    path?: string[];
  }[];
  /** HTTP status text (e.g., 'Not Found'). */
  status?: string;
  /** HTTP status code (e.g., 404). */
  statusCode?: number;
}

/**
 * Generic API client for making HTTP requests to the Noroff API.
 * @template T - The expected return type of the response data.
 * @param {string} endpoint - The API endpoint (e.g., '/social/posts').
 * @param {ApiOptions} [options={}] - Request options.
 * @returns {Promise<T | null>} The parsed JSON response or null for 204 No Content.
 */

async function apiClient<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T | null> {
  const { body, ...customOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    'X-Noroff-API-Key': import.meta.env.VITE_NOROFF_API_KEY || '',
  };

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customOptions,
    headers: {
      ...headers,
      ...customOptions.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(BASE_URL + endpoint, config);

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || 'An API error occurred'
      );
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
}
/**
 * Fetch data from the API.
 * @param endpoint (e.g., '/social/posts')
 * @returns The API response data or null.
 */
export const get = <T = unknown>(endpoint: string) => apiClient<T>(endpoint);

/**
 * Create a new resource in the API.
 * @param endpoint (e.g., '/social/posts')
 * @param body The data to create the resource.
 * @returns The API response data or null.
 */
export const post = <T = unknown>(endpoint: string, body: unknown) =>
  apiClient<T>(endpoint, { body });

/**
 * Update an existing resource in the API.
 * @param endpoint (e.g., '/social/posts/1')
 * @param body The data to update the resource.
 * @returns The API response data or null.
 */
export const put = <T = unknown>(endpoint: string, body: unknown) =>
  apiClient<T>(endpoint, { method: 'PUT', body });

/**
 * Delete a resource from the API.
 * @param endpoint (e.g., '/social/posts/1')
 * @returns The API response data or null.
 */
export const del = <T = unknown>(endpoint: string) =>
  apiClient<T>(endpoint, { method: 'DELETE' });
