import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ShareIcon from '@mui/icons-material/Share'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Avatar from '@mui/material/Avatar'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import * as React from 'react'

const Card = () => {
  const [quantity, setQuantity] = React.useState(0)
  const handleUpvote = () => setQuantity(quantity + 1)
  const handleDownvote = () => setQuantity(quantity - 1)

  return (
    <MuiCard sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            Word of the Day
          </Typography>
        </Stack>
        <Typography variant="h6" component="div">
          Phu Quoc quickly identified the challenges it faced and addressed
          them, reaping the rewards after two years of struggling with low
          tourist numbers, analysts said. In the first quarter of this year the
          island received over two million visitors, a 66.5% year-on-year
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1}>
          <Stack direction={'row'} alignItems="center">
            <IconButton aria-label="upvote" onClick={handleUpvote}>
              <ThumbUpIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton aria-label="downvote" onClick={handleDownvote}>
              <ThumbDownIcon />
            </IconButton>
          </Stack>
          <IconButton aria-label="comment">
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </MuiCard>
  )
}

export default Card
