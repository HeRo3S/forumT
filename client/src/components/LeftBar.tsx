import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Grid,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import Loading from './Loading';
import { LeftBarContainer } from './common/Layout';
import UserService from '../api/user';

function LeftBar() {
  const { userInfo: user, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    isLoading: isFollowingGroupsLoading,
    data: followingGroups,
    error: followingGroupsError,
  } = FetchGroupsUserFollowing(user?.username);

  const {
    isLoading: isModeratingGroupsLoading,
    data: moderatingGroups,
    error: moderatingGroupsError,
  } = FetchGroupsUserModerating(user?.username);

  const handleGroupButtonClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    groupname: string
  ) => {
    navigate(`/g/${groupname}`);
  };

  if (isFollowingGroupsLoading || isModeratingGroupsLoading)
    return (
      <LeftBarContainer item xs={2}>
        <Loading />;
      </LeftBarContainer>
    );
  if (accessToken.length > 0)
    return (
      <LeftBarContainer item xs={2}>
        {followingGroups && followingGroups.length > 0 && (
          <>
            <Typography variant="h4">Nhóm đang theo dõi</Typography>
            <List>
              {followingGroups.map((g) => (
                <ListItemButton
                  key={g.groupname}
                  onClick={(e) =>
                    handleGroupButtonClick(e, g.groupname as string)
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        src={g.avatarURL ? g.avatarURL : ''}
                        alt="Group"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>g/{g.groupname}</ListItemText>
                </ListItemButton>
              ))}
            </List>
          </>
        )}
        {moderatingGroups && moderatingGroups.length > 0 && (
          <>
            <Typography variant="h4">Nhóm đang quản lý</Typography>
            <List>
              {moderatingGroups.map((g) => (
                <ListItemButton
                  key={g.groupname}
                  onClick={(e) =>
                    handleGroupButtonClick(e, g.groupname as string)
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        src={g.avatarURL ? g.avatarURL : ''}
                        alt="Group"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>g/{g.groupname}</ListItemText>
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </LeftBarContainer>
    );
  return <Grid item xs={2} />;
}

function FetchGroupsUserFollowing(username: string | undefined) {
  const { isLoading, data, error } = useSWR(
    username ? `u/${username}/following` : null,
    () => {
      if (!username) return null;
      return UserService.fetchGroupsUserFollowing({ username });
    }
  );
  return {
    isLoading,
    data,
    error,
  };
}

function FetchGroupsUserModerating(username: string | undefined) {
  const { isLoading, data, error } = useSWR(
    username ? [`u/${username}/moderating`, username] : null,
    () => {
      if (!username) return null;
      return UserService.fetchGroupsUserModerating({ username });
    }
  );
  return {
    isLoading,
    data,
    error,
  };
}

export default LeftBar;
