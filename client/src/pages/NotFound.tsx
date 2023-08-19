import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoBackHomePageButton = () => {
    navigate('/');
  };
  return (
    <Container>
      <Typography variant="h3">Không tìm thấy trang</Typography>
      <Button variant="contained" onClick={handleGoBackHomePageButton}>
        Quay về trang chủ
      </Button>
    </Container>
  );
}

export default NotFound;
