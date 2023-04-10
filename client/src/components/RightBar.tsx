import { Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import { RightBarContainer } from './common/Layout';

const StyledUserProfilePlaceholder = styled(Stack)(({ theme }) => ({
  height: '400px',
  backgroundColor: theme.palette.common.white,
  borderRadius: '20px',
}));

function RightBar() {
  const user = useAppSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  const handleCreatePostButtonClick = () => {
    navigate('/create/post');
  };
  const handleCreateGroupButtonClick = () => {
    navigate('/create/group');
  };

  if (!user) return <RightBarContainer item xs={2} />;
  return (
    <RightBarContainer item xs={2}>
      <StyledUserProfilePlaceholder>
        <Typography variant="h4">{user.username}</Typography>
        <Typography variant="subtitle2">u/{user.username}</Typography>
        <Button>Xem hồ sơ</Button>
        <Button onClick={handleCreatePostButtonClick}>Tạo bài viết</Button>
        <Button onClick={handleCreateGroupButtonClick}>Tạo nhóm</Button>
      </StyledUserProfilePlaceholder>
    </RightBarContainer>
  );
}

export default RightBar;
