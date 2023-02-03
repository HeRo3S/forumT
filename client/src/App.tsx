import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { store } from './redux/store';
import routes from './routes';
import defaultTheme from './style/muitheme';

function App() {
  return (
    <div className="App">
      <Navbar />
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
