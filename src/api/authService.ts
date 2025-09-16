import { post } from './apiClient';
import type { Media } from './postsService';
import { showErrorPopup } from '../components/Popups';

export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface User {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media;
  banner: Media;
  accessToken: string;
}
export interface LoginResponse {
  data: User;
  meta: Record<string, unknown>;
}

export interface RegisterResponse {
  data: User;
  meta: Record<string, unknown>;
}

export async function register(data: RegisterData): Promise<LoginResponse> {
  if (!validateRegisterData(data)) {
    throw new Error('Validation failed');
  }

  const response = await post<RegisterResponse>('/auth/register', data);
  if (!response)
    throw new Error('Error registering user: No response data received.');

  return response;
}

/**
 * Logs in a user with provided credentials
 * @param data - The login data containing email and password
 * @returns A promise that resolves to the login response
 */

export async function login(data: LoginData): Promise<LoginResponse> {
  if (!validateLoginData(data)) {
    throw new Error('Validation failed');
  }
  try {
    const response = await post<LoginResponse>('/auth/login', data);
    if (!response) {
      throw new Error('Error signing in: No response data received.');
    }

    localStorage.setItem('accessToken', response.data.accessToken);
    return response;
  } catch (error) {
    console.error(error);
    showErrorPopup(
      'Please check your email and password, and try again.',
      'Login failed.'
    );
    throw error;
  }
}

/**
 * Validates login form data including email and password requirements
 * @param {Object} data - The form data object to validate
 * @param {string} data.email - The user's email address
 * @param {string} data.password - The user's password
 * @returns {boolean} True if all validation passes, false otherwise
 */

function validateLoginData(data: LoginData): boolean {
  if (!data) {
    showErrorPopup(
      'Please check all fields, and try again.',
      'No data provided.'
    );
    return false;
  }

  if (!data.email || !data.password) {
    showErrorPopup(
      'Please check all fields, and try again. ',
      'All fields are required.'
    );
    return false;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  const passwordRegex = /^[a-zA-Z0-9._%+-]{8,}$/;

  if (!emailRegex.test(data.email)) {
    showErrorPopup(
      'Email must be a valid email address ending with @stud.noroff.no',
      'Invalid email format.'
    );
    return false;
  }
  if (!passwordRegex.test(data.password)) {
    showErrorPopup(
      'Password must be at least 8 characters long and can only contain letters, numbers, and special characters.',
      'Invalid password.'
    );
    return false;
  }
  return true;
}

/**
 * Validates registration form data including name, email and password requirements
 * @param {Object} data - The form data object to validate
 * @param {string} data.name - The user's full name
 * @param {string} data.email - The user's email address
 * @param {string} data.password - The user's password
 * @returns {boolean} True if all validation passes, false otherwise
 */

function validateRegisterData(data: RegisterData): boolean {
  if (!data) {
    showErrorPopup(
      'Please check all fields, and try again.',
      'No data provided.'
    );
    return false;
  }

  if (!data.name || !data.email || !data.password) {
    showErrorPopup(
      'Please check all fields, and try again. ',
      'All fields are required.'
    );
    return false;
  }
  const nameRegex = /^[a-zA-ZÀ-ÿ\s-]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/;
  const passwordRegex = /^[a-zA-ZÀ-ÿ0-9#?!@$%^&*-]{8,}$/;

  if (!nameRegex.test(data.name)) {
    showErrorPopup(
      'Name must be at least 3 characters long and can only contain letters, spaces, and hyphens.',
      'Invalid name format.'
    );
    return false;
  }

  if (!emailRegex.test(data.email)) {
    showErrorPopup(
      'Email must be a valid email address ending with @stud.noroff.no',
      'Invalid email format.'
    );
    return false;
  }
  if (!passwordRegex.test(data.password)) {
    showErrorPopup(
      'Password must be at least 8 characters long and can only contain letters, numbers, and special characters.',
      'Invalid password.'
    );
    return false;
  }
  return true;
}

/**
 * Checks if user is logged in
 * @returns {boolean} True if user is authenticated, false otherwise
 */

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('accessToken');
}
