import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { register } from '../redux/features/authSlice';
import { useAppDispatch } from '../redux/hook';
import { ReqUser } from '../../types/interfaces/reqAPI';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '150px',
}));

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const retypePasswordRef = useRef<HTMLInputElement>();

  function handleSubmitRegister(e: React.FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    // TODO return input error when retype password don't match
    if (passwordRef.current?.value !== retypePasswordRef.current?.value) {
      console.error("password won't match");
      return;
    }
    const reqUser: ReqUser = {
      email: emailRef.current?.value,
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    dispatch(register(reqUser))
      .unwrap()
      .then(() => {
        navigate('/login');
      });
  }

  function handleClickLoginButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: '15vh',
        padding: '40px',
        borderRadius: '44px',
      }}
      className="mainContainer"
    >
      <form onSubmit={(e) => handleSubmitRegister(e)}>
        <Typography variant="h3">Đăng ký tài khoản</Typography>
        <Stack spacing={1}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            helperText="Nhập email bạn muốn đăng ký"
            inputRef={emailRef}
          />
          <TextField
            fullWidth
            label="Tên người dùng"
            type="string"
            helperText="Nhập tên người dùng cho tài khoản bạn muốn đăng ký"
            inputRef={usernameRef}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            helperText="Nhập mật khẩu cho tài khoản bạn muốn đăng ký"
            inputRef={passwordRef}
          />
          <TextField
            fullWidth
            label="Nhập lại mật khẩu"
            type="password"
            helperText="Nhập lại mật khẩu cho tài khoản bạn muốn đăng ký"
            inputRef={retypePasswordRef}
          />
          <Box display="flex" justifyContent="center">
            <StyledButton
              variant="contained"
              size="large"
              className="longButton"
              type="submit"
              onClick={(e) => handleSubmitRegister(e)}
            >
              Đăng ký
            </StyledButton>
          </Box>
          <Box display="flex" justifyContent="center">
            <StyledButton
              variant="contained"
              size="large"
              className="longButton"
              onClick={(e) => handleClickLoginButton(e)}
            >
              Đăng nhập
            </StyledButton>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}

export default Register;
