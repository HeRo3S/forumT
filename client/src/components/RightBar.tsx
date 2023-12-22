import { Avatar, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import { RightBarContainer } from './common/Layout';

const StyledUserProfilePlaceholder = styled(Stack)(({ theme }) => ({
  height: '400px',
  backgroundColor: theme.palette.common.white,
  borderRadius: '20px',
  alignItems: 'center',
}));

function RightBar() {
  const { userInfo, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCreatePostButtonClick = () => {
    navigate('/create/post');
  };
  const handleCreateGroupButtonClick = () => {
    navigate('/create/group');
  };
  const handleUserProfileButtonClick = () => {
    navigate(`u/${userInfo?.username}`);
  };

  if (accessToken.length <= 0) return <RightBarContainer item xs={2} />;
  return (
    <RightBarContainer item xs={2}>
      <StyledUserProfilePlaceholder>
        <Avatar>
          <img
            src={userInfo.avatarURL}
            alt={userInfo.username}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Avatar>

        <Typography variant="h4">
          {userInfo.displayname || userInfo.username}
        </Typography>
        <Typography variant="subtitle2">u/{userInfo.username}</Typography>
        <Button onClick={handleUserProfileButtonClick}>Xem hồ sơ</Button>
        <Button onClick={handleCreatePostButtonClick}>Tạo bài viết</Button>
        <Button onClick={handleCreateGroupButtonClick}>Tạo nhóm</Button>
      </StyledUserProfilePlaceholder>
    </RightBarContainer>
  );
}

export default RightBar;
