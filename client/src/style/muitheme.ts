import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          backgroundColor: '#F67575',
          minWidth: '160px',
          borderRadius: '17px',
        },
      },
    },
  },
});

export default defaultTheme;
