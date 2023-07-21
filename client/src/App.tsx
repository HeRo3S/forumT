import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { injectStore } from './api';
import Navbar from './components/Navbar';
import { useAppSelector } from './redux/hook';
import { store } from './redux/store';
import routes from './routes';
import defaultTheme from './style/muitheme';

injectStore(store);

function WrappedApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

function App() {
  const user = useAppSelector((state) => state.auth.accessToken);
  const { normalRoutes, authenticateRoutes, userRoutes } = routes;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {normalRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        {authenticateRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={user ? <Navigate to="/" /> : <route.component />}
          />
        ))}
        {userRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={user ? <route.component /> : <Navigate to="/" />}
          />
        ))}
      </Routes>
    </div>
  );
}

export default WrappedApp;
