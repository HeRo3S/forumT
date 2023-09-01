import useSWR from 'swr';
import {
  Typography,
  Button,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ContentContainer } from '../common/Layout';
import ModeratorService from '../../api/moderator';
import ModerateBanUser from '../dialog/ModerateBanUser';

interface IUserListProps {
  groupname: string;
}
function UserList(props: IUserListProps) {
  const navigate = useNavigate();
  const { groupname } = props;
  const [username, setUsername] = useState<string>('');
  const [isUserBanned, setUserBanned] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const { isLoading, data, error } = FetchUsersList(groupname);

  const closeModerateBanUserDialog = () => {
    setDialogOpen(false);
  };
  const openModerateBanUserDialog = () => {
    setDialogOpen(true);
  };

  const onClickViewProfileButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    usernameData: string
  ) => {
    navigate(`/u/${usernameData}`);
  };

  const onClickBanUserButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    usernameData: string
  ) => {
    setUsername(usernameData);
    setUserBanned(false);
    openModerateBanUserDialog();
  };
  const onClickUnbanUserButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    usernameData: string
  ) => {
    setUsername(usernameData);
    setUserBanned(true);
    openModerateBanUserDialog();
  };

  return (
    <ContentContainer>
      <ModerateBanUser
        groupname={groupname}
        username={username}
        isBanned={isUserBanned}
        isOpen={isDialogOpen}
        onClose={closeModerateBanUserDialog}
      />
      <TableContainer component={Paper}>
        <TableHead>
          <TableCell>Tên người dùng</TableCell>
          <TableCell>Phân quyền</TableCell>
          <TableCell>Ngày được gỡ cấm</TableCell>
          <TableCell>Tuỳ chọn khác</TableCell>
        </TableHead>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user.username}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {new Date(user.timeUnbanned).toLocaleString('vi-VN', {
                  timeZone: 'Asia/Ho_Chi_Minh',
                })}
              </TableCell>
              <TableCell>
                <Button
                  onClick={(e) => onClickViewProfileButton(e, user.username)}
                >
                  Xem hồ sơ
                </Button>
                {user.role === 'SOFTBANNED' ? (
                  <Button
                    onClick={(e) => onClickUnbanUserButton(e, user.username)}
                  >
                    Gỡ cấm
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => onClickBanUserButton(e, user.username)}
                  >
                    Cấm
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
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
