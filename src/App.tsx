import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import router from './router/router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './utils/theme'

const queryClient = new QueryClient()

function App() {
  // console.log(token)
  // const auth_token = {
  //   state: {
  //     token: 'test'
  //   },
  //   version: 0
  // }
  // localStorage.setItem('auth-store', JSON.stringify(auth_token))
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer />
        <CssBaseline />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
