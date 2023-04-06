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
  const { isLoading, data: groups, error } = FetchGroupsUserFollowing(user);

  const handleGroupButtonClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    groupname: string
  ) => {
    navigate(`/g/${groupname}`);
  };

  if (isLoading)
    return (
      <LeftBarContainer item xs={2}>
        <Loading />;
      </LeftBarContainer>
    );
  if (user)
    return (
      <LeftBarContainer item xs={2}>
        <Typography variant="h4">Nhóm đang theo dõi</Typography>
        {groups && (
          <List>
            {groups.map((g) => (
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

export default LeftBar;
