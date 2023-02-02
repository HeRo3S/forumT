import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../redux/features/authSlice';
import { useAppDispatch } from '../redux/hook';
import { ReqUser } from '../utils/interfaces/reqAPI';

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const retypePasswordRef = useRef<HTMLInputElement>();

  function handleSubmitRegister(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    // TODO return input error when retype password don't match
    if (passwordRef.current?.value !== retypePasswordRef.current?.value) return;
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
        <Grid2
          container
          rowSpacing={3}
          sx={{ mt: '40px', justifyContent: 'center' }}
        >
          <Grid2 xs={10}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              helperText="Nhập email bạn muốn đăng ký"
              inputRef={emailRef}
            />
          </Grid2>
          <Grid2 xs={10}>
            <TextField
              fullWidth
              label="Tên người dùng"
              type="string"
              helperText="Nhập tên người dùng cho tài khoản bạn muốn đăng ký"
              inputRef={usernameRef}
            />
          </Grid2>
          <Grid2 xs={10}>
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              helperText="Nhập mật khẩu cho tài khoản bạn muốn đăng ký"
              inputRef={passwordRef}
            />
          </Grid2>
          <Grid2 xs={10}>
            <TextField
              fullWidth
              label="Nhập lại mật khẩu"
              type="password"
              helperText="Nhập lại mật khẩu cho tài khoản bạn muốn đăng ký"
            />
          </Grid2>
          <Grid2 xs={3} container rowSpacing={1.5}>
            <Grid2 xs={12} display="flex" justifyContent="center">
              <Button
                variant="contained"
                size="large"
                className="longButton"
                type="submit"
              >
                Đăng ký
              </Button>
            </Grid2>
            <Grid2 xs={12} display="flex" justifyContent="center">
              <Link to="/login">
                <Button variant="contained" size="large" className="longButton">
                  Đăng nhập
                </Button>
              </Link>
            </Grid2>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}

export default Register;
