import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#F67575',
    },
  },
  typography: {
    h4: {
      fontWeight: 'bold',
    },
    h5: {
      // fontWeight: 'bold',
    },
    subtitle1: {
      fontWeight: 'bold',
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      color: '#616161',
    },
    button: {
      color: 'grey',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          borderRadius: '17px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
};

const defaultTheme = createTheme(themeOptions);

export default defaultTheme;
