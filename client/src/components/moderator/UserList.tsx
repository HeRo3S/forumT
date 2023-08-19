import useSWR from 'swr';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ContentContainer } from '../common/Layout';
import ModeratorService from '../../api/moderator';

interface IUserListProps {
  groupname: string;
}
function UserList(props: IUserListProps) {
  const navigate = useNavigate();
  const { groupname } = props;
  const { isLoading, data, error } = FetchUsersList(groupname);

  const onClickViewProfileButton = (
    e: MouseEvent<HTMLButtonElement>,
    username: string
  ) => {
    navigate(`/u/${username}`);
  };

  return (
    <ContentContainer>
      {data?.map((user) => {
        return (
          <>
            <Typography>{user.username}</Typography>
            <Button onClick={(e) => onClickViewProfileButton(e, user.username)}>
              Xem hồ sơ
            </Button>
            <Button>Cấm</Button>
          </>
        );
      })}
    </ContentContainer>
  );
}

function FetchUsersList(groupname: string) {
  const { isLoading, data, error } = useSWR(`g/${groupname}/mod/users`, () => {
    return ModeratorService.fetchUserFollowingGroups(groupname);
  });
  return {
    isLoading,
    data,
    error,
  };
}

export default UserList;
