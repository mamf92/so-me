const BASE_URL = 'https://v2.api.noroff.dev';

async function apiClient(endpoint, options = {}) {
  const { body, ...customOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    'X-Noroff-API-Key': import.meta.env.VITE_NOROFF_API_KEY || '',
  };

  const config = {
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
      const errorData = await response.json();
      throw new Error(
        errorData.errors?.[0]?.message || 'An API error occurred'
      );
    }

    // If the response has no content (e.g., a 204 No Content), we don't try to parse it
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Client Error:', error);
    // Re-throw the error so the calling code can handle it
    throw error;
  }
}

// Now we can export helper methods
export const get = (endpoint) => apiClient(endpoint);
export const post = (endpoint, body) => apiClient(endpoint, { body });
export const put = (endpoint, body) =>
  apiClient(endpoint, { method: 'PUT', body });
export const del = (endpoint) => apiClient(endpoint, { method: 'DELETE' });
