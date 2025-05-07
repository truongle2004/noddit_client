import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Search from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Mail from '@mui/icons-material/Mail'
import Tooltip from '@mui/material/Tooltip'
import Notifications from '@mui/icons-material/Notifications'
import { ACTION } from '@/constant'
import Button from '@mui/material/Button'
import useActionStore from '@/store/actionStore'
import AccountMenu from './AccountMenu'
import ThemeControl from './ThemeControl'

const AppbarItem = () => {
  const { setAction } = useActionStore()
  const handleCreateNewPost = () => setAction(ACTION.CREATE_NEW_POST)

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      width="100%"
      justifyContent={'space-between'}
    >
      {/* App Title */}
      <Typography variant="h6" noWrap component="div">
        Noddit
      </Typography>

      {/* Search Field */}
      <TextField
        placeholder="Looking for..."
        size="small"
        variant="outlined"
        sx={{ flexGrow: 1, maxWidth: 300 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />

      <Stack direction={'row'} spacing={2}>
        <ThemeControl />
        {/* Email Icon */}
        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
        </IconButton>

        <Tooltip title="Create new post">
          <Button
            variant="text"
            onClick={handleCreateNewPost}
            startIcon={<AddIcon />}
            sx={{
              color: 'inherit'
            }}
          >
            Create
          </Button>
        </Tooltip>

        {/* Notifications Icon */}
        <IconButton color="inherit">
          <Badge badgeContent={10} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        {/* Avatar + User Menu */}
        <Box sx={{ flexGrow: 0 }}>
          <AccountMenu />
        </Box>
      </Stack>
    </Box>
  )
}

export default AppbarItem
