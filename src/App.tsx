import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material'
import router from './router/router'
import CssBaseline from '@mui/material/CssBaseline'
import AuthProvider from './providers/AuthProvider'
import theme from './utils/theme'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer />
        </CssVarsProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
