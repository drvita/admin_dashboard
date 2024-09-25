import { cookies } from 'next/headers';
import { decryptData } from '@/lib/encryption';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('API URL is not defined');
}

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestOptions {
  method: RequestMethod;
  path: string;
  body?: any;
  useAuth?: boolean;
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public errors?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

async function getAuthToken(): Promise<string | null> {
  const cookieStore = cookies();
  const encryptedToken = cookieStore.get('auth_token')?.value;

  if (!encryptedToken) {
    return null;
  }

  return await decryptData(encryptedToken);
}

export async function apiRequest<T>({ method, path, body, useAuth = false }: ApiRequestOptions): Promise<T> {
  const url = `${API_URL}${path}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (useAuth) {
    const token = await getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);
    let data;
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new ApiError(response.status, 'Invalid JSON response from server');
      }
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(response.status, data.message || 'An error occurred', data.errors);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}

// Utility functions for common API operations
export const api = {
  get: <T>(path: string, useAuth = false) => apiRequest<T>({ method: 'GET', path, useAuth }),
  post: <T>(path: string, body: any, useAuth = false) => apiRequest<T>({ method: 'POST', path, body, useAuth }),
  put: <T>(path: string, body: any, useAuth = false) => apiRequest<T>({ method: 'PUT', path, body, useAuth }),
  delete: <T>(path: string, useAuth = false) => apiRequest<T>({ method: 'DELETE', path, useAuth }),
};