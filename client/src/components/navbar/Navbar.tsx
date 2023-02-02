import Notifications from '@mui/icons-material/Notifications';
import Search from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import './navbar.css';

function Navbar() {
  const auth = useAppSelector((state) => state.auth);

  return (
    <div id="navbar">
      <Grid2 xs={3} id="leftNav">
        <Link to="/">
          <button type="button">
            <img src="../../../public/reddit.png" alt="Logo" className="logo" />
            <span>ForumT</span>
          </button>
        </Link>
      </Grid2>

      <Grid2 xs id="centerNav">
        <Search />
      </Grid2>

      <Grid2 xs={3} id="rightNav">
        <Notifications />
        {auth.accessToken !== '' ? (
          <button type="button">
            <span>{auth.userInfo.username}</span>
          </button>
        ) : (
          <Link to="/login">
            <Button variant="contained" size="large" className="longButton">
              Đăng nhập
            </Button>
          </Link>
        )}
      </Grid2>
    </div>
  );
}

export default Navbar;
