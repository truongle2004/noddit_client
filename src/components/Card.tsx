import * as React from 'react'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'

// Icons
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ShareIcon from '@mui/icons-material/Share'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'

interface CardProps {
  cardWidth: number
}

const Card: React.FC<CardProps> = ({ cardWidth }) => {
  // State management
  const [likes, setLikes] = React.useState(42)
  const [dislikes, setDislikes] = React.useState(7)
  const [comments, setComments] = React.useState(12)
  const [isLiked, setIsLiked] = React.useState(false)
  const [isDisliked, setIsDisliked] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)

  // Date formatting
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // Handle like action
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)

      // Remove dislike if present
      if (isDisliked) {
        setDislikes(dislikes - 1)
        setIsDisliked(false)
      }
    }
  }

  // Handle dislike action
  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1)
      setIsDisliked(false)
    } else {
      setDislikes(dislikes + 1)
      setIsDisliked(true)

      // Remove like if present
      if (isLiked) {
        setLikes(likes - 1)
        setIsLiked(false)
      }
    }
  }

  // Handle save action
  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  // Handle comment action
  const handleComment = () => {
    console.log('Comment dialog should open')
    // Implement comment dialog functionality
  }

  // Handle share action
  const handleShare = () => {
    console.log('Share options should appear')
    // Implement share functionality
  }

  // Truncate text to a specific length with ellipsis
  // const truncateText = (text, maxLength) => {
  //   return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  // }

  const cardContent = `Phu Quoc quickly identified the challenges it faced and addressed them, reaping the rewards after two years of struggling with low tourist numbers, analysts said. In the first quarter of this year the island received over two million visitors, a 66.5% year-on-year increase.`

  return (
    <MuiCard
      sx={{
        my: 2,
        maxWidth: cardWidth,
        width: '100%',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt="User Name"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 40, height: 40 }}
          />
        }
        title={
          <Typography variant="subtitle1" fontWeight="600">
            Tourism Insights
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            Posted on {formattedDate}
          </Typography>
        }
        action={
          <Tooltip title={isSaved ? 'Remove from saved' : 'Save for later'}>
            <IconButton onClick={handleSave} size="small">
              {isSaved ? (
                <BookmarkIcon color="primary" />
              ) : (
                <BookmarkBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        }
      />

      <CardContent sx={{ pt: 0, pb: 1 }}>
        <Typography variant="body1" color="text.primary" paragraph>
          {cardContent}
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Box
            component="span"
            sx={{
              bgcolor: 'primary.50',
              color: 'primary.700',
              px: 1.5,
              py: 0.5,
              borderRadius: 4,
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          >
            #tourism
          </Box>
          <Box
            component="span"
            sx={{
              bgcolor: 'primary.50',
              color: 'primary.700',
              px: 1.5,
              py: 0.5,
              borderRadius: 4,
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          >
            #phuquoc
          </Box>
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ px: 2, py: 1 }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: '100%', justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={2}>
            <Tooltip title="Like">
              <IconButton
                onClick={handleLike}
                color={isLiked ? 'primary' : 'default'}
                size="small"
              >
                <Badge badgeContent={likes} color="primary" max={999}>
                  <ThumbUpIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Dislike">
              <IconButton
                onClick={handleDislike}
                color={isDisliked ? 'error' : 'default'}
                size="small"
              >
                <Badge badgeContent={dislikes} color="error" max={999}>
                  <ThumbDownIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Comment">
              <IconButton onClick={handleComment} size="small">
                <Badge badgeContent={comments} color="secondary" max={999}>
                  <ChatBubbleOutlineIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Stack>

          <Tooltip title="Share">
            <IconButton onClick={handleShare} size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardActions>
    </MuiCard>
  )
}

export default Card
