import RefreshIcon from '@mui/icons-material/Refresh'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Skeleton from '@mui/material/Skeleton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import Card from './Card'

type RowProps = {
  index: number
  style: React.CSSProperties
}

const ListCard = () => {
  // State management
  const [cards, setCards] = React.useState(
    Array.from({ length: 25 }).map((_, index) => ({
      id: `card-${index}`,
      isLoaded: true
    }))
  )
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')
  const [sortBy, setSortBy] = React.useState('recent')
  const [activeFilters, setActiveFilters] = React.useState(['all'])
  const [showFilters, setShowFilters] = React.useState(false)

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchText(event.target.value)
  }

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // Handle filter selection
  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setActiveFilters(['all'])
    } else {
      const newFilters = activeFilters.includes('all')
        ? [filter]
        : activeFilters.includes(filter)
          ? activeFilters.filter((f) => f !== filter)
          : [...activeFilters, filter]

      // If no filters selected, default to 'all'
      setActiveFilters(newFilters.length === 0 ? ['all'] : newFilters)
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate loading new data
    setTimeout(() => {
      const newCards = Array.from({ length: 25 }).map((_, index) => ({
        id: `card-${Date.now()}-${index}`,
        isLoaded: true
      }))
      setCards(newCards)
      setIsLoading(false)
    }, 1000)
  }

  // For infinite loader
  const itemCount = cards.length + 1 // +1 for loading more
  const loadMoreItems = async (startIndex: number): Promise<void> => {
    if (isLoading) return
    setIsLoading(true)

    // Simulate loading more items
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = Array.from({ length: 10 }).map((_, index) => ({
          id: `card-${Date.now()}-${startIndex + index}`,
          isLoaded: true
        }))
        setCards((prevCards) => [...prevCards, ...newItems])
        setIsLoading(false)
        resolve()
      }, 1500)
    })
  }

  const isItemLoaded = (index: number) => index < cards.length

  // Render a single row (card with spacing)
  const Row = ({ index, style }: RowProps) => {
    // If we're at the end and not loaded yet, show loading
    if (!isItemLoaded(index)) {
      return (
        <div style={style}>
          <Box sx={{ px: 2, py: 1 }}>
            <Skeleton
              variant="rounded"
              height={250}
              animation="wave"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </div>
      )
    }

    // Otherwise render a card
    return (
      <div style={style}>
        <Box sx={{ px: 2, py: 1 }}>
          <Card key={cards[index].id} />
        </Box>
      </div>
    )
  }

  const availableFilters = [
    { key: 'all', label: 'All' },
    { key: 'tourism', label: 'Tourism' },
    { key: 'technology', label: 'Technology' },
    { key: 'business', label: 'Business' },
    { key: 'entertainment', label: 'Entertainment' }
  ]

  return (
    <Container maxWidth="md" sx={{ pt: 2, pb: 4 }}>
      {/* Header and controls */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" component="h1" fontWeight="600" gutterBottom>
          Trending Stories
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
          <TextField
            placeholder="Search cards..."
            size="small"
            value={searchText}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={sortBy}
              onChange={handleSortChange}
              displayEmpty
              sx={{ height: 40 }}
            >
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="popular">Most Popular</MenuItem>
              <MenuItem value="comments">Most Comments</MenuItem>
            </Select>
          </FormControl>

          <IconButton
            onClick={toggleFilters}
            color={showFilters ? 'primary' : 'default'}
          >
            <TuneIcon />
          </IconButton>

          <IconButton onClick={handleRefresh} disabled={isLoading}>
            <RefreshIcon />
          </IconButton>
        </Box>

        {/* Filters */}
        {showFilters && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: 'background.paper',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Filter by category:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {availableFilters.map((filter) => (
                <Chip
                  key={filter.key}
                  label={filter.label}
                  onClick={() => handleFilterChange(filter.key)}
                  color={
                    activeFilters.includes(filter.key) ? 'primary' : 'default'
                  }
                  variant={
                    activeFilters.includes(filter.key) ? 'filled' : 'outlined'
                  }
                />
              ))}
            </Box>
          </Paper>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Cards list with virtualization */}
      <Box sx={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemCount={itemCount}
                  itemSize={300} // Adjust based on your card height + padding
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {Row}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </Box>

      {/* Loading indicator at bottom */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Loading more items...
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default ListCard
