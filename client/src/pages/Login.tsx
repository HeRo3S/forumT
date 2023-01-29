import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/features/authSlice';
import { useAppDispatch } from '../redux/store';
import { ReqUser } from '../utils/interfaces/reqAPI';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const reqUser: ReqUser = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    dispatch(login(reqUser))
      .unwrap()
      .then(() => {
        navigate('/');
      });
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
              helperText="Nhập email của bạn"
              inputRef={emailRef}
            />
          </Grid2>
          <Grid2 xs={10}>
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              helperText="Nhập mật khẩu của bạn"
              inputRef={passwordRef}
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
                Đăng nhập
              </Button>
            </Grid2>
            <Grid2 xs={12} display="flex" justifyContent="center">
              <Link to="/register">
                <Button variant="contained" size="large" className="longButton">
                  Đăng ký
                </Button>
              </Link>
            </Grid2>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}

export default Login;
