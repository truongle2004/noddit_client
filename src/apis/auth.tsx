import axiosConfig from '@/config/axiosConfig'
import { API_VERSION } from '@/constant'
import type {
  LoginRequest,
  RegisterRequest,
  Response,
  TokenResponse
} from '@/types'

/**
 * Logs in a user with the given credentials.
 * @param {LoginRequest} data - The login data including username/email and password.
 * @returns {Promise<Response<TokenResponse>>} A promise that resolves to the access and refresh tokens.
 */
export const LoginAccountAPI = async (
  data: LoginRequest
): Promise<Response<TokenResponse>> =>
  await axiosConfig.post(`${API_VERSION.V1}/auth/login`, data)

/**
 * Registers a new user with the provided information.
 * @param {RegisterRequest} data - The registration data including username, email, and password.
 * @returns {Promise<Response<{ message: string }>>} A promise that resolves to a success message.
 */
export const RegisterAccountAPI = async (
  data: RegisterRequest
): Promise<Response<{ message: string }>> =>
  await axiosConfig.post(`${API_VERSION.V1}/auth/register`, data)

/**
 * Logs out the currently authenticated user.
 * @returns {Promise<void>} A promise that resolves when the logout is complete.
 */
export const LogoutAPI = async (): Promise<void> =>
  await axiosConfig.post(`${API_VERSION.V1}/auth/logout`)

/**
 * Checks if an email is already registered in the system.
 * @param {string} email - The email to check.
 * @returns {Promise<void>} A promise that resolves if the email does not exist, or rejects otherwise.
 */
export const CheckExistEmailAPI = async (email: string): Promise<void> =>
  await axiosConfig.get(`${API_VERSION.V1}/auth/check-email/${email}`)

/**
 * Checks if a username is already taken.
 * @param {string} username - The username to check.
 * @returns {Promise<void>} A promise that resolves if the username is available, or rejects otherwise.
 */
export const CheckUsernameAPI = async (username: string): Promise<void> =>
  await axiosConfig.get(`${API_VERSION.V1}/auth/check-username/${username}`)

/**
 * Refreshes the user's access token using a refresh token.
 * @returns {Promise<Response<TokenResponse>>} A promise that resolves to a new access and refresh token pair.
 */
export const RefreshTokenAPI = async (): Promise<Response<TokenResponse>> =>
  await axiosConfig.post(`${API_VERSION.V1}/auth/refresh`)
