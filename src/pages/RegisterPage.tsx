import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import BgImage from '@/assets/auth_bg.jpg'
import { emailRegex } from '@/constant'
import { ToastifyError, ToastifySuccess } from '@/utils/toastify'
import {
  CheckExistEmailAPI,
  CheckUsernameAPI,
  RegisterAccountAPI
} from '@/apis/auth'

// Form validation schema
const schema = z
  .object({
    username: z.string().min(8, 'Username must be at least 8 characters'),
    email: z.string().email('This is not a valid email'),
    password: z.string().nonempty('Password is required'),
    confirmPassword: z.string().nonempty('Confirm Password is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

const RegisterPage = () => {
  const [isEmailAccepted, setIsEmailAccepted] = useState(false)
  const [isUsernameAccepted, setIsUsernameAccepted] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const navigate = useNavigate()

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(schema)
  })

  const { mutate: checkEmailMutation } = useMutation({
    mutationFn: CheckExistEmailAPI,
    onSuccess: () => {
      setIsEmailAccepted(true)
      setEmailError('')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setIsEmailAccepted(false)
        setEmailError('Email is already taken')
      }
    }
  })

  const { mutate: checkUsernameMutation } = useMutation({
    mutationFn: CheckUsernameAPI,
    onSuccess: () => {
      setIsUsernameAccepted(true)
      setUsernameError('')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setIsUsernameAccepted(false)
        const msg = error.response?.data.message || 'Username already taken'
        setUsernameError(msg)
      }
    }
  })

  const { mutate: registerMutation } = useMutation({
    mutationFn: RegisterAccountAPI,
    onSuccess: () => {
      ToastifySuccess('Registration successful! Please login again.')
      navigate('/login')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data.message || 'Registration failed'
        ToastifyError(msg)
      }
    }
  })

  const debouncedCheckUsername = useRef(
    debounce((username) => {
      checkUsernameMutation(username)
    }, 500)
  ).current

  const debouncedCheckEmail = useRef(
    debounce((email) => {
      checkEmailMutation(email)
    }, 500)
  ).current

  const checkingUsername = () => {
    const username = watch('username')

    if (username === '') {
      setUsernameError('')
      setIsUsernameAccepted(false)
      return
    }

    if (!errors.username?.message && username.length >= 8) {
      debouncedCheckUsername(username)
    } else {
      setIsUsernameAccepted(false)
    }
  }

  const checkingEmail = () => {
    const email = watch('email')

    if (email === '') {
      setEmailError('')
      setIsEmailAccepted(false)
      return
    }

    if (emailRegex.test(email)) {
      debouncedCheckEmail(email)
    } else {
      setIsEmailAccepted(false)
    }
  }

  useEffect(() => {
    checkingUsername()
    return () => debouncedCheckUsername.cancel()
  }, [watch('username')])

  useEffect(() => {
    checkingEmail()
    return () => debouncedCheckEmail.cancel()
  }, [watch('email')])

  // TODO: remove any
  const onSubmit = (data: any) => {
    // Convert to the structure expected by your API
    const registerData = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword // Adjust field name for API if needed
    }

    // Check for validation and API validation errors
    if (errors.email || emailError) {
      ToastifyError(errors.email?.message || emailError)
      return
    }

    if (errors.username || usernameError) {
      ToastifyError(errors.username?.message || usernameError)
      return
    }

    if (!isUsernameAccepted) {
      ToastifyError('Please use a valid username')
      return
    }

    if (!isEmailAccepted) {
      ToastifyError('Please use a valid email')
      return
    }

    // If all validations pass, proceed with registration
    registerMutation(registerData)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${BgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 4,
          padding: 4,
          maxWidth: 600,
          width: '100%'
        }}
      >
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Create Account
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          gutterBottom
        >
          Fill in the details to get started
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <TextField
              fullWidth
              type="text"
              label="Username"
              {...register('username')}
              error={!!errors.username || !!usernameError}
              helperText={errors.username?.message || usernameError}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              error={!!errors.email || !!emailError}
              helperText={errors.email?.message || emailError}
            />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              useFlexGap
            >
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ py: 1.5 }}
            >
              Create Account
            </Button>

            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1976d2' }}>
                Login
              </Link>
            </Typography>
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default RegisterPage
