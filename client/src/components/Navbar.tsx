import Notifications from '@mui/icons-material/Notifications';
import Search from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout, refreshAccessToken } from '../redux/features/authSlice';
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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLoginButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    //* sending jwt cookies either way since there is no way to check
    if (auth.accessToken === '') {
      try {
        await dispatch(refreshAccessToken()).unwrap();
      } catch (err) {
        if (!auth.userInfo) navigate('/login');
      }
    }
  };

  const handleUserButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuButtonClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    url = ''
  ) => {
    handleUserMenuClose();
    navigate(url);
  };

  const handleLogoutButtonClick = () => {
    dispatch(logout());
  };

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
            <>
              <Button
                id="user-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleUserButtonClick}
              >
                {auth.userInfo.username}
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleUserMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'user-button',
                }}
              >
                <MenuItem
                  onClick={(e) =>
                    handleMenuButtonClick(e, `u/${auth?.userInfo?.username}`)
                  }
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={(e) => handleLogoutButtonClick(e)}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={(e) => handleLoginButtonClick(e)}
            >
              Đăng nhập
            </Button>
          )}
        </Grid>
      </Grid>
    </StyledNavbarBox>
  );
}

export default Navbar;
