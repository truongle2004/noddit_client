import ExploreIcon from '@mui/icons-material/Explore'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom'

const ExploreItem = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/explore')
  }
  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <ExploreIcon />
      </ListItemIcon>
      <ListItemText primary="Explore" />
    </ListItemButton>
  )
}

export default ExploreItem
