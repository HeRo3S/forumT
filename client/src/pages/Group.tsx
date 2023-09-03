import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite';
import useSWR from 'swr';
import Grid, { GridProps } from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import { Avatar, Box } from '@mui/material';
import GroupService from '../api/group';
import { ContentContainer, PageContainer } from '../components/common/Layout';
import Loading from '../components/Loading';
import Post from '../components/post/Post';
import LeftBar from '../components/LeftBar';
import { useAppSelector } from '../redux/hook';
import UserList from '../components/moderator/UserList';
import PaginationConfig from '../config/axios/pagination';
import GroupInfoForm from '../components/form/GroupInfoForm';
import { ResGroupInfo } from '../../types/interfaces/resAPI';
import ModeratorList from '../components/moderator/ModeratorList';
import SoftBannedList from '../components/moderator/SoftBannedList';

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
const StyledEndOfPostsDiv = styled(`div`)({
  marginBottom: '20px',
  height: '20px',
});

enum RENDERMODE {
  POSTS,
  USER_MANAGER,
  INFO_MANAGER,
}

function Group() {
  const PUBLIC_FOLDER = import.meta.env.VITE_APP_API_URL;
  const { groupname } = useParams();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [renderMode, setRenderMode] = useState<RENDERMODE>(RENDERMODE.POSTS);
  const endOfPostsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { isGroupPostsLoading, pages, groupPostErrors, size, setSize } =
    FetchGroupPostsData(groupname as string);
  const {
    isGroupInfoLoading,
    data: fetchGroupInfoData,
    groupInfoError,
    mutateGroupInfo,
  } = FetchGroupInfo(groupname as string);
  const {
    isFetchUserFollowingLoading,
    userFollowingGroup,
    fetchUserFollowingError,
    mutateUserFollowing,
  } = FetchUserFollowingGroup(groupname as string, accessToken);

  useEffect(() => {
    const handleLoadMore: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          pages &&
          pages[pages.length - 1].nextCursorID !== -1
        ) {
          console.log(`intersection ${size}`);
          setSize(size + 1);
        }
      });
    };

    const option = {
      root: null,
      threshold: 0,
      margin: 0,
    };
    observerRef.current = new IntersectionObserver(handleLoadMore, option);
    if (endOfPostsRef.current)
      observerRef.current.observe(endOfPostsRef.current);

    return () => {
      if (observerRef?.current) observerRef.current.disconnect();
    };
  }, [pages, setSize, size]);

  if (!groupname)
    return <Typography variant="h1">Can`&apos`t find groupname</Typography>;

  if (groupInfoError || groupPostErrors)
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
    if (accessToken === '') return <Box />;
    if (!userFollowingGroup)
      return (
        <Button variant="contained" onClick={handleOnClickFollowButton}>
          Tham gia nhóm
        </Button>
      );
    const { role } = userFollowingGroup;
    switch (role) {
      case 'OWNER':
        return <Button variant="outlined">Người thành lập</Button>;
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
    if (accessToken === '') return <Box />;
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
        {(userFollowingGroup?.role === 'MODERATOR' ||
          userFollowingGroup?.role === 'OWNER') && (
          <>
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
            <StyledNavbarItem
              item
              xs
              isSelected={renderMode === RENDERMODE.INFO_MANAGER}
              onClick={(e) =>
                handleOnClickChangeRenderModeButton(e, RENDERMODE.INFO_MANAGER)
              }
            >
              <Typography>Thay đổi thông tin</Typography>
            </StyledNavbarItem>
          </>
        )}
      </Grid>
    );
  };

  const renderBody = (role?: string) => {
    switch (renderMode) {
      case RENDERMODE.POSTS: {
        if (!pages) return <Box />;

        const posts = pages.map((page) => {
          const { groupPosts } = page;
          return groupPosts.map((p) => {
            const { id } = p;
            if (role && (role === 'MODERATOR' || role === 'OWNER'))
              return (
                <>
                  <Post key={id} groupname={groupname} id={id} modVariant />;
                </>
              );
            return (
              <>
                <Post key={id} groupname={groupname} id={id} />;
              </>
            );
          });
        });

        return (
          <>
            {posts}
            <StyledEndOfPostsDiv ref={endOfPostsRef} />
          </>
        );
      }
      case RENDERMODE.USER_MANAGER:
        return (
          <>
            <ModeratorList groupname={groupname} />
            <SoftBannedList groupname={groupname} />
            <UserList groupname={groupname} />
          </>
        );
      case RENDERMODE.INFO_MANAGER:
        return <GroupInfoForm groupInfo={groupInfo as ResGroupInfo} />;
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
              <Avatar
                alt="GroupLogo"
                src={
                  groupInfo?.displayname
                    ? PUBLIC_FOLDER + groupInfo.avatarURL
                    : ''
                }
              >
                {groupInfo?.displayname?.at(0) || groupInfo?.groupname[0]}
              </Avatar>
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
        {renderBody(userFollowingGroup?.role)}
      </Grid>
    </PageContainer>
  );
}

function FetchGroupPostsData(groupname: string) {
  const { isLoading, error, data, size, setSize } = useSWRInfinite(
    (index, previousData) => {
      let url = `g/${groupname}/posts?limit=${PaginationConfig.groupPostsLimit}`;
      if (!previousData?.nextCursorID) return url;
      if (previousData.nextCursorID === -1) return null;
      url += `&cursor=${previousData.nextCursorID}`;
      return url;
    },
    (url) => GroupService.getGroupPosts(url)
  );

  return {
    isGroupPostsLoading: isLoading,
    pages: data,
    groupPostErrors: error,
    size,
    setSize,
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

function FetchUserFollowingGroup(groupname: string, accessToken: string) {
  const { isLoading, error, data, mutate } = useSWR(
    () => {
      if (accessToken === '') return null;
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
