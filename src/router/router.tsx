import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import SuspenseWrapper from '@/components/SuspenseWrapper'
import DashboardPage from '@/pages/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageNotFound from '@/components/PageNotFound'

const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))

const router = createBrowserRouter([
  {
    path: 'login',
    element: (
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    )
  },
  {
    path: 'register',
    element: (
      <SuspenseWrapper>
        <Register />
      </SuspenseWrapper>
    )
  },
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </SuspenseWrapper>
    )
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])

export default router
