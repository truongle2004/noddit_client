import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  colorSchemes: {
    dark: {},
    light: {}
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          paddingRight: '0px'
        }
      }
    }
  }
})

export default theme
