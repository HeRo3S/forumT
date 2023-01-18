import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import defaultTheme from './style/muitheme';
import routes from './utils/routes';

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </div>
  );
}

function WrappedApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default WrappedApp;
