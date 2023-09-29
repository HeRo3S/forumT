import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { injectStore } from './api';
import Navbar from './components/Navbar';
import { useAppSelector } from './redux/hook';
import { store } from './redux/store';
import routes from './routes';
import defaultTheme from './style/muitheme';
import GlobalAlert from './components/common/GlobalAlert';
import NotFound from './pages/NotFound';

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
  const { userInfo, accessToken } = useAppSelector((state) => state.auth);
  const { normalRoutes, authenticateRoutes, userRoutes, superAdminRoutes } =
    routes;

  const setUpSuperAdminRoutes = () => {
    if (userInfo.userType !== 'SUPERADMIN') return <Route />;
    return (
      <>
        {superAdminRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              userInfo?.userType === 'SUPERADMIN' ? (
                <route.component />
              ) : (
                <NotFound />
              )
            }
          />
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <Navbar />
      <GlobalAlert />
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
            element={accessToken ? <Navigate to="/" /> : <route.component />}
          />
        ))}
        {userRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={accessToken ? <route.component /> : <Navigate to="/" />}
          />
        ))}
        {setUpSuperAdminRoutes()}
      </Routes>
    </div>
  );
}

export default WrappedApp;
