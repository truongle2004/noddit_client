import * as React from 'react'
import { useRef } from 'react'
import ImageIcon from '@mui/icons-material/Image'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const CommunityStyle = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // TODO: do somethings
    }
  }

  return (
    <Box>
      <Typography variant="h5" id="create-community-title" gutterBottom>
        Style your community
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Adding visual flair will catch new members attention and help establish
        your community’s culture! You can update this at any time.
      </Typography>

      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <Stack direction="row" spacing={2} mt={2}>
            <Stack spacing={2} flex={1}>
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography>Banner</Typography>
                <Button
                  startIcon={<ImageIcon />}
                  variant="contained"
                  onClick={handleButtonClick}
                >
                  Choose Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Stack>
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography>Icon</Typography>
                <Button
                  startIcon={<ImageIcon />}
                  variant="contained"
                  onClick={handleButtonClick}
                >
                  Choose Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Stack>
            </Stack>

            <Card sx={{ minWidth: 250 }}>
              <CardContent>
                <Typography variant="h6"></Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  1 member · 1 online
                </Typography>
                <Typography variant="body2" mt={1}></Typography>
              </CardContent>
            </Card>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CommunityStyle
