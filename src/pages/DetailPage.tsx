import React from 'react'
import {
  Box,
  Card as MuiCard,
  CardMedia,
  Avatar,
  Typography,
  Container,
  Grid,
  Paper,
  Divider,
  Chip,
  Stack,
  useTheme
} from '@mui/material'
import Card from '@/components/Card'

const DetailPage = () => {
  const theme = useTheme()
  const title = 'Sample Title'
  const description =
    'This is a sample description for the detail page. You can update it with your actual content.'
  const bannerImage =
    'https://i.pinimg.com/736x/c4/b3/1d/c4b31d1f1e2631d4c89a28318d3c1046.jpg'
  const avatarImage =
    'https://i.pinimg.com/736x/6a/bc/f8/6abcf84ac150893bfaad32730c3a99a8.jpg'
  const createdAt = 'May 17, 2025'
  const tags = ['React', 'MUI', 'Demo']
  const additionalInfo = {
    Author: 'John Doe',
    Category: 'Technology',
    Views: '1234'
  }

  const cards = Array.from({ length: 15 })

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ position: 'relative', mb: 6 }}>
        {/* Banner Image */}
        <MuiCard elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="300"
            image={bannerImage}
            alt={title}
            sx={{
              width: '100%',
              objectFit: 'cover'
            }}
          />
        </MuiCard>

        {/* Avatar with overlap on banner */}
        <Avatar
          src={avatarImage}
          alt={`${title} avatar`}
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
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Created: {createdAt}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
            >
              {tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body1" paragraph>
              {description}
            </Typography>
            <Box>
              {cards.map((card, index) => (
                <Card key={index} cardWidth={theme.custom.width.cardDetail} />
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Side Information */}
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
        </Grid>
      </Grid>
    </Container>
  )
}

export default DetailPage
