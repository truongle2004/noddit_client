import { THEME } from '@/constant'
import IconButton from '@mui/material/IconButton'
import { useColorScheme } from '@mui/material/styles'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const ThemeControl = () => {
  const { mode, setMode } = useColorScheme()

  const handleToggleDarkMode = () => {
    setMode(mode === THEME.DARK ? THEME.LIGHT : THEME.DARK)
  }

  return (
    <IconButton onClick={handleToggleDarkMode}>
      {mode === THEME.DARK ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  )
}

export default ThemeControl
