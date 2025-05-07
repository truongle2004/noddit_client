import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      px={2}
    >
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" mb={2}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Homepage
      </Button>
    </Box>
  )
}

export default PageNotFound
