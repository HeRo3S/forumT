import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import jwt_decode from 'jwt-decode';
import { login, refreshAccessToken } from '../redux/features/authSlice';
import { useAppDispatch } from '../redux/hook';
import { ReqUser } from '../../types/interfaces/reqAPI';
import AuthService from '../api/auth';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '150px',
}));

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [lastUserLoggedInfo, setLastUserLoggedInfo] = useState();

  //* sending jwt cookies either way since there is no way to check
  useEffect(() => {
    const fetchData = async () => {
      const { accessToken } = await AuthService.refreshAccessToken();
      setLastUserLoggedInfo(jwt_decode(accessToken));
    };
    fetchData();
  }, []);

  function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const reqUser: ReqUser = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    dispatch(login(reqUser))
      .unwrap()
      .then(() => {
        navigate(-1);
      });
  }

  function handleOnClickRefreshSession(
    e: React.MouseEvent<HTMLButtonElement>
  ): void {
    e.preventDefault();
    dispatch(refreshAccessToken())
      .unwrap()
      .then(() => {
        navigate(-1);
      });
  }

  function handleOnClickRegisterButton(
    e: React.MouseEvent<HTMLButtonElement>
  ): void {
    e.preventDefault();
    navigate('/register');
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: '20vh',
        padding: '40px',
        borderRadius: '44px',
      }}
      className="mainContainer"
    >
      <form onSubmit={(e) => handleSubmitLogin(e)}>
        <Typography variant="h3">Đăng nhập</Typography>
        {lastUserLoggedInfo && (
          <>
            <Box>
              <Typography variant="h5">Đăng nhập lại vào tài khoản</Typography>
              <Button onClick={(e) => handleOnClickRefreshSession(e)}>
                {lastUserLoggedInfo.username}
              </Button>
            </Box>
            <Typography variant="h5">
              hoặc đăng nhập vào tài khoản mới
            </Typography>
          </>
        )}
        <Stack spacing={1}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            helperText="Nhập email của bạn"
            inputRef={emailRef}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            helperText="Nhập mật khẩu của bạn"
            inputRef={passwordRef}
          />
          <Box display="flex" justifyContent="center">
            <StyledButton variant="contained" size="large" type="submit">
              Đăng nhập
            </StyledButton>
          </Box>
          <Box display="flex" justifyContent="center">
            <StyledButton
              variant="contained"
              size="large"
              onClick={(e) => handleOnClickRegisterButton(e)}
            >
              Đăng ký
            </StyledButton>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}

export default Login;
