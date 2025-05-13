import { RefreshTokenAPI } from '@/apis/auth'
import router from '@/router/router'
import { useAuthStore } from '@/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, setToken } = useAuthStore()
  const { mutate } = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: RefreshTokenAPI,
    onSuccess: (data) => {
      const token = data.data.token.access_token || ''
      if (token) setToken(token)
    },
    onError: (error) => {
      console.log(error)
      router.navigate('/login')
    }
  })

  useEffect(() => {
    if (!token) {
      mutate()
    } else {
      // TODO: something
    }
  }, [])
  return children
}

export default AuthProvider
