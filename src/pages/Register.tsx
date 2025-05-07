import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import BgImage from '@/assets/auth_bg.jpg'
import axios from 'axios'
import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { emailRegex } from '@/constant'
import { ToastifyError, ToastifySuccess } from '@/utils/toastify'
import type { RegisterRequest } from '@/types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  CheckExistEmailAPI,
  CheckUsernameAPI,
  RegisterAccountAPI
} from '@/services/auth'

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

const Register = () => {
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
  } = useForm<RegisterRequest>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirm_password: ''
    },
    resolver: zodResolver(schema)
  })

  const { mutate: checkEmailMutation } = useMutation({
    mutationFn: CheckExistEmailAPI,
    onSuccess: () => setIsEmailAccepted(true),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data.message
        setEmailError(msg)
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
        const msg = error.response?.data.message
        setUsernameError(msg)
      }
    }
  })

  const { mutate: registerMutation } = useMutation({
    mutationFn: RegisterAccountAPI,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_) => {
      ToastifySuccess('Registration successful!. Please login again.')
      navigate('/login')
    }
  })

  const debouncedCheckUsername = useRef(
    debounce((username: string) => {
      checkUsernameMutation(username)
    }, 500)
  ).current

  const debouncedCheckEmail = useRef(
    debounce((email: string) => {
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
      setUsernameError('')
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
      setEmailError('')
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

  const onSubmit = (data: RegisterRequest) => {
    if (emailError) {
      ToastifyError(errors.email?.message || emailError)
      return
    }

    if (isUsernameAccepted && isEmailAccepted) {
      registerMutation(data)
    } else {
      if (!isUsernameAccepted && !usernameError) {
        ToastifyError('Please use a valid username')
      }
      if (!isEmailAccepted && !emailError) {
        ToastifyError('Please use a valid email')
      }
    }
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
                {...register('confirm_password')}
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
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

export default Register
