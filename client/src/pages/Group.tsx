import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Grid, { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Box } from '@mui/material';
import GroupService from '../api/group';
import { ContentContainer, PageContainer } from '../components/common/Layout';
import Loading from '../components/Loading';
import Post from '../components/post/Post';
import GroupLogo from '../assets/dev_purpose/gamingLogo.png';
import LeftBar from '../components/LeftBar';
import { useAppSelector } from '../redux/hook';
import UserList from '../components/moderator/UserList';

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
  USER_MANAGER,
}

function Group() {
  const { groupname } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [renderMode, setRenderMode] = useState<RENDERMODE>(RENDERMODE.POSTS);

  if (!groupname)
    return <Typography variant="h1">Can`&apos`t find groupname</Typography>;

  const { isGroupPostsLoading, posts, groupPostErrors } =
    FetchGroupPostsData(groupname);
  const {
    isGroupInfoLoading,
    data: fetchGroupInfoData,
    groupInfoError,
    mutateGroupInfo,
  } = FetchGroupInfo(groupname);
  const {
    isFetchUserFollowingLoading,
    userFollowingGroup,
    fetchUserFollowingError,
    mutateUserFollowing,
  } = FetchUserFollowingGroup(groupname, userInfo);

  if (groupInfoError || fetchUserFollowingError || groupPostErrors)
    return <Typography variant="h1">Error</Typography>;

  if (isGroupInfoLoading || isGroupPostsLoading || isFetchUserFollowingLoading)
    return <Loading />;

  const { groupInfo, nFollowers } = fetchGroupInfoData || {};

  const handleOnClickFollowButton = async () => {
    const res = await GroupService.followGroup(groupname);
    mutateUserFollowing(res);
    mutateGroupInfo();
  };
  const handleOnClickUnFollowButton = async () => {
    const res = await GroupService.unfollowGroup(groupname);
    mutateUserFollowing(res);
    mutateGroupInfo();
  };

  const handleOnClickChangeRenderModeButton = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    mode: RENDERMODE
  ) => {
    setRenderMode(mode);
  };

  const renderFollowButton = () => {
    if (!userFollowingGroup)
      return (
        <Button variant="contained" onClick={handleOnClickFollowButton}>
          Tham gia nhóm
        </Button>
      );
    const { role } = userFollowingGroup;
    switch (role) {
      case 'MODERATOR':
        return <Button variant="outlined">Quản trị viên</Button>;
      case 'USER':
        return (
          <Button variant="outlined" onClick={handleOnClickUnFollowButton}>
            Đã tham gia
          </Button>
        );
      default:
        // eslint-disable-next-line react/jsx-no-useless-fragment
        return <></>;
    }
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
          <Typography>Danh sách bài viết</Typography>
        </StyledNavbarItem>
        {userFollowingGroup?.role === 'MODERATOR' && (
          <StyledNavbarItem
            item
            xs
            isSelected={renderMode === RENDERMODE.USER_MANAGER}
            onClick={(e) =>
              handleOnClickChangeRenderModeButton(e, RENDERMODE.USER_MANAGER)
            }
          >
            <Typography>Quản lý thành viên</Typography>
          </StyledNavbarItem>
        )}
      </Grid>
    );
  };

  const renderBody = () => {
    switch (renderMode) {
      case RENDERMODE.POSTS:
        if (!posts) return <Box />;

        return posts.map((p) => {
          const { id } = p;
          return <Post key={id} groupname={groupname} id={id} />;
        });
      case RENDERMODE.USER_MANAGER:
        return <UserList />;
      default:
        console.error("can't find mode");
        return <Box />;
    }
  };

  return (
    <PageContainer container>
      <LeftBar />
      <Grid item xs={8}>
        <ContentContainer>
          <Grid container>
            <Grid item xs>
              <img src={GroupLogo} alt="GroupLogo" />
              <Typography variant="h4">
                {groupInfo?.displayname || groupInfo?.groupname}
              </Typography>
              <Typography variant="subtitle2">
                g/{groupInfo?.groupname}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2">
                {nFollowers} người đã theo dõi nhóm
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {renderFollowButton()}
            </Grid>
          </Grid>
          {renderNavBar()}
        </ContentContainer>
        {renderBody()}
      </Grid>
    </PageContainer>
  );
}

function FetchGroupPostsData(groupname: string) {
  const { isLoading, error, data } = useSWR(`g/${groupname}/posts`, () =>
    GroupService.getGroupPosts(groupname)
  );

  return {
    isGroupPostsLoading: isLoading,
    posts: data,
    groupPostErrors: error,
  };
}

function FetchGroupInfo(groupname: string) {
  const { isLoading, error, data, mutate } = useSWR(
    `g/${groupname}`,
    () => GroupService.getGroupInfo(groupname),
    {
      revalidateOnFocus: false,
    }
  );
  return {
    isGroupInfoLoading: isLoading,
    data,
    groupInfoError: error,
    mutateGroupInfo: mutate,
  };
}

function FetchUserFollowingGroup(groupname: string, user: unknown) {
  const { isLoading, error, data, mutate } = useSWR(
    () => {
      if (!user) return null;
      return `g/${groupname}/follow`;
    },
    () => GroupService.checkUserFollowingGroup(groupname)
  );
  return {
    isFetchUserFollowingLoading: isLoading,
    fetchUserFollowingError: error,
    userFollowingGroup: data,
    mutateUserFollowing: mutate,
  };
}

export default Group;
