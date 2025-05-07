import * as React from 'react'
import AddIcon from '@mui/icons-material/Add'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import useDashboardStore from '@/store/dashboardStore'

const Commnunity = () => {
  const [open, setOpen] = React.useState(true)
  const { setOpenModalCreateCommunity } = useDashboardStore()
  const handleClick = () => setOpen(!open)
  const handleOpenModelCreateCommunity = () => setOpenModalCreateCommunity(true)

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="COMMUNITIES" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={handleOpenModelCreateCommunity}
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Create a community"
                primaryTypographyProps={{
                  fontSize: 13
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  )
}

export default Commnunity
