import { RefreshTokenAPI } from '@/apis/auth'
import router from '@/router/router'
import { useAuthStore } from '@/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, setToken } = useAuthStore()
  const { mutate: RefreshTokenMutation } = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: RefreshTokenAPI,
    onSuccess: (data) => {
      const token = data.data.token.access_token || ''
      if (token) setToken(token)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (_) => {
      router.navigate('/login')
    }
  })

  useEffect(() => {
    if (!token) {
      RefreshTokenMutation()
    }
  }, [RefreshTokenMutation, token])
  return children
}

export default AuthProvider
