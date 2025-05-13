import { jwtDecode } from 'jwt-decode'

export interface DecodedToken {
  sub: string
  exp: number
  iat: number
  id: string
  email: string
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    console.error('Invalid token:', error)
    return null
  }
}
