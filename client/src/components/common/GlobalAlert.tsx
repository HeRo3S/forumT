import { Alert, AlertTitle, Box, Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { clearAlert } from '../../redux/features/alertSlice';

const StyledAlertContainer = styled(Box)({
  position: 'fixed',
  zIndex: '1000',
});
export default function GlobalAlert() {
  const { message, severity } = useAppSelector((state) => state.alert);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setOpen(message !== '');
    const timer = setTimeout(() => {
      setOpen(false);
      dispatch(clearAlert());
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, severity, dispatch]);
  return (
    <StyledAlertContainer>
      <Slide in={open}>
        <Alert severity={severity}>
          <AlertTitle>{severity}</AlertTitle>
          {message}
        </Alert>
      </Slide>
    </StyledAlertContainer>
  );
}
