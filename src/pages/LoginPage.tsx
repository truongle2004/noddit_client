import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import BgImage from '@/assets/auth_bg.jpg'
import { LoginAccountAPI } from '../apis/auth'
import { ToastifyError, ToastifySuccess } from '@/utils/toastify'
import axios from 'axios'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().nonempty('Password is required')
})

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(schema)
  })

  const [togglePassword, setTogglePassword] = useState(false)
  const { setToken } = useAuthStore()
  const navigate = useNavigate()

  const { isPending, mutate } = useMutation({
    mutationFn: LoginAccountAPI,
    mutationKey: ['login'],
    onSuccess: (result) => {
      setToken(result.data?.token?.access_token)
      ToastifySuccess('Login successful')
      navigate('/')
    },
    onError: (error) => {
      ToastifyError('Invalid credentical provided')
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data.message
        ToastifyError(msg)
      }
    }
  })

  const onSubmit = (data: { email: string; password: string }) => {
    try {
      mutate(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box display="flex" minHeight="100vh">
      {/* Background Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', lg: 'block' },
          backgroundImage: `url(${BgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
          px: 4
        }}
      >
        <Container maxWidth="sm">
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: (theme) => theme.palette.primary.main
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please sign in to your account
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            <FormControl fullWidth margin="normal" error={!!errors.email}>
              <TextField
                label="Email"
                type="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal" error={!!errors.password}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
                type={togglePassword ? 'text' : 'password'}
                {...register('password')}
              />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>

            <Box display="flex" alignItems="center" mt={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={togglePassword}
                    onChange={() => setTogglePassword(!togglePassword)}
                  />
                }
                label="Show Password"
              />
              <Box ml="auto">
                <Typography
                  variant="body2"
                  color="primary"
                  component="a"
                  href="#"
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Forgot password?
                </Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.5 }}
              disabled={isPending}
            >
              {isPending ? 'Loading...' : 'Login'}
            </Button>
          </Box>

          <Typography variant="body2" align="center" mt={3}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1976d2' }}>
              Create an account
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default LoginPage
