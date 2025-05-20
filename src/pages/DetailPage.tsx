import ListCard from '@/components/ListCard'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import { useQuery } from '@tanstack/react-query'
import { getCommunityById } from '@/apis/community'
import { useParams, useNavigate } from 'react-router-dom'

const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    data: community,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['community', id],
    queryFn: () => getCommunityById(id as string),
    enabled: !!id // Only run the query if we have an ID
  })

  // If we don't have an ID at all
  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">
          <AlertTitle>Invalid Request</AlertTitle>
          No community ID was provided. Please select a valid community.
        </Alert>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
        >
          Return to Homepage
        </Button>
      </Container>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Loading community details...
        </Typography>
      </Container>
    )
  }

  // Show error state
  if (isError || !community) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>Community Not Found</AlertTitle>
          {isError ? (
            <>
              Error loading community:{' '}
              {error instanceof Error ? error.message : 'Unknown error'}
            </>
          ) : (
            <>
              The community you're looking for doesn't exist or has been
              removed.
            </>
          )}
        </Alert>
        <Button variant="contained" onClick={() => navigate('/')}>
          Return to Homepage
        </Button>
      </Container>
    )
  }

  // Render the detailed view when we have data
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ position: 'relative', mb: 6 }}>
        {/* Banner Image */}
        <MuiCard elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="300"
            image={
              'https://i.pinimg.com/736x/c4/b3/1d/c4b31d1f1e2631d4c89a28318d3c1046.jpg'
            }
            // alt={community?.data?.banner_image.toString() || 'Banner Image'}
            sx={{
              width: '100%',
              objectFit: 'cover'
            }}
          />
        </MuiCard>

        {/* Avatar with overlap on banner */}
        <Avatar
          src={community?.data.icon_image}
          alt={`${community?.data.name} avatar`}
          sx={{
            width: 120,
            height: 120,
            border: '4px solid white',
            position: 'absolute',
            bottom: -40,
            left: { xs: '50%', md: 40 },
            transform: { xs: 'translateX(-50%)', md: 'none' },
            boxShadow: 2
          }}
        />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Main Content */}
          <Box sx={{ pl: { md: 2 }, pt: { xs: 5, md: 0 } }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {community?.data.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Created:{' '}
              {new Date(community?.data.created_at).toLocaleString()}{' '}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
            >
              {community?.data.topics.map((tag) => (
                <Chip key={tag.id} label={tag.name} size="small" />
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body1" paragraph>
              {community?.data.description}
            </Typography>
            <Box
              sx={{
                width: '100vh'
              }}
            >
              <ListCard />
            </Box>
          </Box>
        </Grid>

        {/* <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {Object.entries(additionalInfo).map(([key, value]) => (
              <Box key={key} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {key}
                </Typography>
                <Typography variant="body2">{value}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid> */}
      </Grid>
    </Container>
  )
}

export default DetailPage
