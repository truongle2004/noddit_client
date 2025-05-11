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
    token_type: string
  }
}

export interface Topic {
  id: string
  name: string
  description: string
}

export interface Rules {
  id: string
  title: string
  description: string
  position: number
}

export interface Community {
  id: string
  name: string
  title: string
  description: string
  type: string
  banner_image: string
  icon_image: string
  created_at: Date
  updated_at: Date
  topics: Topic[]
}

export interface CreateCommunity {
  name: string
  description: string
  topic: string[]
  type: string
}

export type CommunityPrivacy = 'public' | 'restricted' | 'private'
