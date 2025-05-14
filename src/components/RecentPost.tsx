import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Skeleton from '@mui/material/Skeleton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'

// Mock data with more realistic content
const mockPosts = [
  {
    id: 1,
    title: 'Introduction to React Hooks',
    preview: 'Learn how to use useState, useEffect, and other React hooks...',
    author: 'Emma Wilson',
    avatar: '/static/images/avatar/1.jpg',
    date: '2 days ago',
    upvotes: 87,
    comments: 14,
    readTime: '5 min read',
    categories: ['React', 'Frontend']
  },
  {
    id: 2,
    title: 'Building Responsive UIs with Material-UI',
    preview: 'A comprehensive guide to creating beautiful interfaces...',
    author: 'David Chen',
    avatar: '/static/images/avatar/2.jpg',
    date: '5 days ago',
    upvotes: 124,
    comments: 23,
    readTime: '7 min read',
    categories: ['Material-UI', 'Design']
  },
  // Generate more mock posts with realistic content
  ...Array.from({ length: 23 }).map((_, index) => ({
    id: index + 3,
    title: `How to Master ${['JavaScript', 'CSS', 'React', 'Node.js', 'TypeScript', 'Redux'][index % 6]} in 2025`,
    preview: 'Learn the latest techniques and best practices...',
    author: ['Alex Morgan', 'Lisa Park', 'John Smith', 'Sara Miller'][
      index % 4
    ],
    avatar: `/static/images/avatar/${(index % 5) + 1}.jpg`,
    date: `${index + 1} days ago`,
    upvotes: Math.floor(Math.random() * 200),
    comments: Math.floor(Math.random() * 30),
    readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
    categories: [
      [
        'React',
        'Frontend',
        'JavaScript',
        'Web Development',
        'CSS',
        'Programming'
      ][index % 6],
      ['Tips', 'Tutorial', 'Guide', 'Advanced', 'Beginner'][index % 5]
    ]
  }))
]

const RecentPosts = () => {
  const [bookmarked, setBookmarked] = useState({})
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(false)

  // Toggle bookmark state for a post
  const toggleBookmark = (postId) => {
    setBookmarked((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  // Filter posts based on selected tab
  const getFilteredPosts = () => {
    switch (tabValue) {
      case 1: // Last week
        return mockPosts.filter((_, index) => index < 10)
      case 2: // Last month
        return mockPosts
      default: // Recent (last 3 days)
        return mockPosts.filter((_, index) => index < 5)
    }
  }

  const filteredPosts = getFilteredPosts()

  const handleTabChange = (_, newValue) => {
    setLoading(true)
    setTabValue(newValue)
    // Simulate loading delay
    setTimeout(() => setLoading(false), 600)
  }

  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflowY: 'auto',
        bgcolor: (theme) => theme.palette.background.default,
        padding: 2,
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Recently Read Posts
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Recent" />
        <Tab label="Last Week" />
        <Tab label="Last Month" />
      </Tabs>

      {loading ? (
        // Loading skeletons
        <Stack direction="column" spacing={2}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={`skeleton-${index}`} sx={{ width: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton width="60%" height={20} />
                </Stack>
                <Skeleton width="80%" height={28} />
                <Skeleton width="70%" height={20} />
                <Stack direction="row" spacing={2} mt={1}>
                  <Skeleton width={80} height={20} />
                  <Skeleton width={80} height={20} />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Stack direction="column" spacing={2}>
          {filteredPosts.length === 0 ? (
            <Typography color="text.secondary" align="center" py={4}>
              No posts found for this time period
            </Typography>
          ) : (
            filteredPosts.map((post) => (
              <Card
                key={post.id}
                sx={{
                  width: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  },
                  position: 'relative'
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                    <Avatar alt={post.author} src={post.avatar} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {post.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {post.date} · {post.readTime}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <Tooltip
                        title={
                          bookmarked[post.id]
                            ? 'Remove bookmark'
                            : 'Bookmark for later'
                        }
                      >
                        <IconButton
                          size="small"
                          onClick={() => toggleBookmark(post.id)}
                          color={bookmarked[post.id] ? 'primary' : 'default'}
                        >
                          {bookmarked[post.id] ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderOutlinedIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>

                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {post.preview}
                  </Typography>

                  <Stack direction="row" spacing={1} mb={2}>
                    {post.categories.map((category, idx) => (
                      <Chip
                        key={idx}
                        label={category}
                        size="small"
                        sx={{ borderRadius: 1 }}
                      />
                    ))}
                  </Stack>

                  <Stack direction="row" spacing={3} alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton size="small">
                        <ThumbUpOutlinedIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" color="text.secondary">
                        {post.upvotes}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton size="small">
                        <ChatBubbleOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" color="text.secondary">
                        {post.comments}
                      </Typography>
                    </Stack>
                    <Badge
                      color="primary"
                      variant="dot"
                      invisible={post.id > 3}
                      sx={{ ml: 'auto' }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {post.id <= 3 ? 'New' : ''}
                      </Typography>
                    </Badge>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      )}

      {filteredPosts.length > 10 && (
        <Box textAlign="center" mt={3}>
          <Chip label="Load more" clickable sx={{ px: 2 }} />
        </Box>
      )}
    </Box>
  )
}

export default RecentPosts
