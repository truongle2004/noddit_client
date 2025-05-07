import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const RecentPost = () => {
  const posts = Array.from({ length: 25 })

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflowY: 'auto',
        bgcolor: (theme) => theme.palette.background.default,
        padding: 1
      }}
    >
      <Stack direction="column" spacing={2}>
        {posts.map((_, index) => (
          <Card key={index} sx={{ minWidth: 275, width: 580 }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Typography
                  gutterBottom
                  sx={{ color: 'text.secondary', fontSize: 14 }}
                >
                  Word of the Day #{index + 1}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Typography>
                  {Math.floor(Math.random() * 100)} upvotes
                </Typography>
                <Typography>
                  {Math.floor(Math.random() * 20)} comments
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default RecentPost
