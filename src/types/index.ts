/**
 * Payload for login request.
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * Payload for user registration.
 */
export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirm_password: string
}

/**
 * Standard API response wrapper.
 * @template T The type of the `data` field.
 */
export interface Response<T> {
  data: T
  success: boolean
}

/**
 * Response payload containing authentication tokens.
 */
export interface TokenResponse {
  token: {
    access_token: string
    /** The type of the token, usually "Bearer". */
    token_type: string
  }
}
