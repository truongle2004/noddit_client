import { getCommunityByTopicIdAPI, getListTopicAPI } from '@/apis/community'
import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Drawer from '@/components/Drawer/Drawer'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { env } from '@/config/environment'
import { useNavigate } from 'react-router-dom'

const ExplorePage = () => {
  const { data: topics } = useQuery({
    queryKey: ['topics'],
    queryFn: getListTopicAPI
  })

  const [itemId, setItemId] = useState('')
  const handleSelect = (id: string) => {
    setItemId(id)
  }

  const { data: communities } = useQuery({
    queryKey: ['communities'],
    queryFn: () => getCommunityByTopicIdAPI(itemId),
    enabled: itemId !== ''
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.8
      scrollRef.current.scrollTo({
        left:
          direction === 'left'
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  const navigate = useNavigate()

  const handleClickCard = (id: string) => {
    navigate(`/detail/${id}`)
  }

  return (
    <>
      <Drawer>
        {/* Topic Selection Bar */}
        <Box mb={4}>
          <Stack display={'flex'} direction={'row'} justifyContent={'center'}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                width: '100%',
                maxWidth: '1200px'
              }}
            >
              {/* Left Arrow */}
              <IconButton onClick={() => scroll('left')}>
                <ChevronLeft />
              </IconButton>

              {/* Scrollable container */}
              <Box
                ref={scrollRef}
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  scrollbarWidth: 'none', // Firefox
                  '&::-webkit-scrollbar': { display: 'none' }, // Chrome
                  mx: 1,
                  flex: 1
                }}
              >
                <Button
                  size="small"
                  variant={itemId === '' ? 'contained' : 'outlined'}
                  sx={{ flex: '0 0 auto', mr: 1, borderRadius: 4, px: 2 }}
                  onClick={() => setItemId('')}
                >
                  all
                </Button>
                {topics?.data.map((item) => (
                  <Button
                    key={item.id}
                    size="small"
                    variant={itemId === item.id ? 'contained' : 'outlined'}
                    sx={{ flex: '0 0 auto', mr: 1, borderRadius: 4, px: 2 }}
                    onClick={() => handleSelect(item.id)}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>

              {/* Right Arrow */}
              <IconButton onClick={() => scroll('right')}>
                <ChevronRight />
              </IconButton>
            </Box>
          </Stack>
        </Box>

        {/* Community Cards in Grid Layout */}
        <Box sx={{ px: 4 }}>
          {' '}
          {/* Added horizontal padding */}
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: -1.5 // Creates negative margin to offset the padding of individual cards
              }}
            >
              {communities?.data.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    width: { xs: '100%', sm: '50%', md: '33.333%' }, // Exactly 3 cards per row on md+ screens
                    padding: 1.5, // Padding creates spacing between cards
                    boxSizing: 'border-box',
                    display: 'flex'
                  }}
                >
                  <Card
                    onClick={() => handleClickCard(item.id)}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Stack
                        direction={'row'}
                        gap={2}
                        alignItems="center"
                        mb={1.5}
                      >
                        <Avatar
                          alt={item.name}
                          src={`${env.API_URL}${item.icon_image}`}
                          sx={{ width: 48, height: 48 }}
                        />
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: 'medium' }}
                        >
                          {item.name}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          minHeight: '3em'
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: 'flex-end', pt: 0, pb: 2, pr: 2 }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 2 }}
                      >
                        Join
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* Show a message when no communities are selected or available */}
            {(!communities || communities.data.length === 0) && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '200px'
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {itemId === ''
                    ? 'Please select a topic to view communities'
                    : 'No communities found for this topic'}
                </Typography>
              </Box>
            )}
          </Container>
        </Box>
      </Drawer>
    </>
  )
}

export default ExplorePage
