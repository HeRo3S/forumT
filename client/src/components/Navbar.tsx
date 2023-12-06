import Notifications from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box, { BoxProps } from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout, refreshAccessToken } from '../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import SearchBar from './common/SearchBar';

const StyledNavbarBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'sticky',
  backgroundColor: theme.palette.common.white,
  zIndex: '1000',
  top: '0',
  marginBottom: '5px',
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

  const handleLogoButtonClick = () => {
    navigate('/');
  };

  const handleLoginButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    navigate('/login');
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

  const handleLogoutButtonClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    dispatch(logout());
  };

  const handleAdminButtonClick = () => {
    navigate('/admin');
  };

  return (
    <StyledNavbarBox>
      <Grid container>
        <Grid item container xs={3} id="leftNav">
          <button type="button" onClick={handleLogoButtonClick}>
            <StyledLogoImg src="../../../public/steam.png" alt="Logo" />
            <span>ForumT</span>
          </button>
        </Grid>

        <Grid item container xs id="centerNav">
          <Grid item xs>
            <SearchBar />
          </Grid>
        </Grid>

        <Grid item container xs={3} direction="row-reverse">
          {auth.accessToken.length > 0 ? (
            <>
              {auth.userInfo.userType === 'SUPERADMIN' && (
                <Button onClick={handleAdminButtonClick}>ADMIN</Button>
              )}
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
                <MenuItem onClick={handleLogoutButtonClick}>Logout</MenuItem>
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
