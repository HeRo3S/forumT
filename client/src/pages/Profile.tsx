import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Grid, { GridProps } from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Avatar, Box } from '@mui/material';
import { ContentContainer, PageContainer } from '../components/common/Layout';
import Loading from '../components/Loading';
import Post from '../components/post/Post';
import LeftBar from '../components/LeftBar';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import UserService from '../api/user';
import UserInfoForm from '../components/form/UserInfoForm';
import { showAlert } from '../redux/features/alertSlice';
import UserPostsList from '../components/profile/UserPostsList';
import UserCommentsList from '../components/profile/UserCommentsList';

interface IRenderButtonProps extends GridProps {
  isSelected: boolean;
}
const StyledNavbarItem = styled(Grid)<IRenderButtonProps>(
  ({ isSelected, theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 0',
    backgroundColor: isSelected ? theme.palette.grey[200] : undefined,
  })
);

enum RENDERMODE {
  POSTS,
  COMMENTS,
  USER_MANAGER,
}

function Profile() {
  const PUBLIC_FOLDER = import.meta.env.VITE_APP_API_URL;
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const clientUserData = useAppSelector((state) => state.auth.userInfo);
  const [renderMode, setRenderMode] = useState<RENDERMODE>(RENDERMODE.POSTS);

  if (!username)
    return <Typography variant="h1">Can`&apos`t find username</Typography>;

  const {
    isUserInfoLoading,
    data: userData,
    userInfoError,
    mutateUserInfo,
  } = FetchUserInfo(username);

  const handleOnClickChangeRenderModeButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mode: RENDERMODE
  ) => {
    setRenderMode(mode);
  };

  const renderNavBar = () => {
    return (
      <Grid container>
        <StyledNavbarItem
          item
          xs
          isSelected={renderMode === RENDERMODE.POSTS}
          onClick={(e) =>
            handleOnClickChangeRenderModeButton(e, RENDERMODE.POSTS)
          }
        >
          <Typography>Bài viết đã tạo</Typography>
        </StyledNavbarItem>
        <StyledNavbarItem
          item
          xs
          isSelected={renderMode === RENDERMODE.COMMENTS}
          onClick={(e) =>
            handleOnClickChangeRenderModeButton(e, RENDERMODE.COMMENTS)
          }
        >
          <Typography>Bình luận đã tạo</Typography>
        </StyledNavbarItem>
        {clientUserData?.username === userData?.username && (
          <StyledNavbarItem
            item
            xs
            isSelected={renderMode === RENDERMODE.USER_MANAGER}
            onClick={(e) =>
              handleOnClickChangeRenderModeButton(e, RENDERMODE.USER_MANAGER)
            }
          >
            <Typography>Thông tin cá nhân</Typography>
          </StyledNavbarItem>
        )}
      </Grid>
    );
  };

  const renderBody = () => {
    switch (renderMode) {
      case RENDERMODE.POSTS:
        return <UserPostsList username={username} />;
      case RENDERMODE.COMMENTS:
        return <UserCommentsList username={username} />;
      case RENDERMODE.USER_MANAGER:
        return <UserInfoForm />;
      default:
        dispatch(showAlert({ message: "can't find mode", severity: 'alert' }));
        return <Box />;
    }
  };

  return (
    <PageContainer container>
      <LeftBar />
      <Grid item xs={8}>
        <ContentContainer>
          <Grid container>
            <Avatar
              alt={userData?.displayname}
              src={
                userData?.avatarURL ? PUBLIC_FOLDER + userData.avatarURL : ''
              }
            />
            <Stack>
              <Typography variant="h4">
                {userData?.displayname || userData?.username}
              </Typography>
              <Typography variant="subtitle2">
                u/{userData?.username}
              </Typography>
            </Stack>
          </Grid>
          {renderNavBar()}
        </ContentContainer>
        {renderBody()}
      </Grid>
    </PageContainer>
  );
}

function FetchUserInfo(username: string) {
  const { isLoading, error, data, mutate } = useSWR(
    `u/${username}`,
    () => UserService.fetchUserInfo({ username }),
    {
      revalidateOnFocus: false,
    }
  );
  return {
    isUserInfoLoading: isLoading,
    data,
    userInfoError: error,
    mutateUserInfo: mutate,
  };
}

export default Profile;
