import Box from '@mui/material/Box'
import Card from './Card'

const ListCard = () => {
  const cards = Array.from({ length: 25 })
  return (
    <Box
      sx={{
        overflowY: 'auto',
        height: '100vh'
      }}
    >
      {cards.map((_, index) => (
        <Box
          sx={{
            my: 1
          }}
        >
          <Card key={index} />
        </Box>
      ))}
    </Box>
  )
}

export default ListCard
