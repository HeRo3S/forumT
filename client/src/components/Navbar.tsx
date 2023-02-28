import Notifications from '@mui/icons-material/Notifications';
import Search from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { refreshAccessToken } from '../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';

const StyledNavbarBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'sticky',
  padding: '5px 5px',
}));

const StyledLogoImg = styled('img')({
  aspectRatio: 'fix',
  maxWidth: '30px',
});

function Navbar() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  //* sending jwt cookies either way since there is no way to check
  if (auth.accessToken === '') {
    dispatch(refreshAccessToken());
  }

  return (
    <StyledNavbarBox>
      <Grid container>
        <Grid item container xs={3} id="leftNav">
          <Link to="/">
            <button type="button">
              <StyledLogoImg src="../../../public/reddit.png" alt="Logo" />
              <span>ForumT</span>
            </button>
          </Link>
        </Grid>

        <Grid item container xs id="centerNav">
          <Search />
          <Notifications />
        </Grid>

        <Grid item container xs={3} direction="row-reverse">
          {auth.userInfo ? (
            <button type="button">
              <span>{auth.userInfo.username}</span>
            </button>
          ) : (
            <Link to="/login">
              <Button variant="contained" size="large">
                Đăng nhập
              </Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </StyledNavbarBox>
  );
}

export default Navbar;
