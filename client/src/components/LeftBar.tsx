import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Grid,
} from '@mui/material';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import GroupService from '../api/group';
import Loading from './Loading';
import { LeftBarContainer } from './common/Layout';

function LeftBar() {
  const user = useAppSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const {
    isLoading: isFollowingGroupsLoading,
    data: followingGroups,
    error: followingGroupsError,
  } = FetchGroupsUserFollowing(user);

  const {
    isLoading: isModeratingGroupsLoading,
    data: moderatingGroups,
    error: moderatingGroupsError,
  } = FetchGroupsUserModerating(user);

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
  if (user)
    return (
      <LeftBarContainer item xs={2}>
        {followingGroups && (
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
                  <ListItemText>g/{g.groupname}</ListItemText>
                </ListItemButton>
              ))}
            </List>
            <Typography variant="h4">Nhóm đang quản lý</Typography>
            <List>
              {moderatingGroups &&
                moderatingGroups.map((g) => (
                  <ListItemButton
                    key={g.groupname}
                    onClick={(e) =>
                      handleGroupButtonClick(e, g.groupname as string)
                    }
                  >
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

function FetchGroupsUserFollowing(user: unknown) {
  const { isLoading, data, error } = useSWR(user ? 'g/following' : null, () =>
    GroupService.fetchGroupsUserFollowing()
  );
  return {
    isLoading,
    data,
    error,
  };
}

function FetchGroupsUserModerating(user: unknown) {
  const { isLoading, data, error } = useSWR(user ? 'g/moderating' : null, () =>
    GroupService.fetchGroupsUserModerating()
  );
  return {
    isLoading,
    data,
    error,
  };
}

export default LeftBar;
