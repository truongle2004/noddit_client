import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import router from './router/router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './utils/theme'
import AuthProvider from './components/AuthProvider'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          <CssBaseline />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
