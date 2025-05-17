import { createTheme } from '@mui/material/styles'

// Extend the MUI Theme to include `custom` properties
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      modalStyle: React.CSSProperties
      width: {
        cardDetail: number
        cardHome: number
      }
    }
  }

  interface ThemeOptions {
    custom?: {
      modalStyle?: React.CSSProperties
      width?: {
        cardDetail?: number
        cardHome?: number
      }
    }
  }
}

const CARD_DETAIL_WIDTH = 700
const CARD_HOME_WIDTH = 800

const theme = createTheme({
  colorSchemes: {
    dark: {},
    light: {}
  },
  custom: {
    modalStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 1000,
      backgroundColor: 'white',
      border: '2px solid #000',
      boxShadow: '0px 3px 6px rgba(0,0,0,0.24)',
      padding: '16px'
    },
    width: {
      cardDetail: CARD_DETAIL_WIDTH,
      cardHome: CARD_HOME_WIDTH
    }
  }
})

export default theme
