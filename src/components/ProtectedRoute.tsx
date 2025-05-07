import { useAuthStore } from '@/store/authStore'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()

  // const { mutate: RefreshTokenMutation } = useMutation({
  //   mutationFn: RefreshTokenAPI,
  //   onSuccess: () => {
  //     // TODO: handle successful refresh token
  //   },
  //   onError: () => {
  //     // TODO: handle error during refresh token
  //   }
  // })

  if (!isAuthenticated()) {
    // FIXME: this cause infinite loop
    // try {
    //   RefreshTokenMutation()
    // } catch (error) {
    //   console.log(error)
    //   return <Navigate to={'/login'} />
    // }
  }

  return children
}

export default ProtectedRoute
