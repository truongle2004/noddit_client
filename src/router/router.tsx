import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import SuspenseWrapper from '@/components/SuspenseWrapper'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageNotFound from '@/components/PageNotFound'

const Login = lazy(() => import('../pages/LoginPage'))
const Register = lazy(() => import('../pages/RegisterPage'))
const Explore = lazy(() => import('../pages/ExplorePage'))
const Dashboard = lazy(() => import('../pages/DashboardPage'))

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
    path: '/explore',
    element: (
      <SuspenseWrapper>
        <Explore />
      </SuspenseWrapper>
    )
  },
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <ProtectedRoute>
          <Dashboard />
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
