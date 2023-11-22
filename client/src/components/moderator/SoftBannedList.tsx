import useSWR from 'swr';
import {
  Button,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Pagination,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ContentContainer } from '../common/Layout';
import ModeratorService from '../../api/moderator';
import ModerateBanUser from '../dialog/ModerateBanUser';
import PaginationConfig from '../../config/axios/pagination';

interface IUserListProps {
  groupname: string;
}
function SoftBannedList(props: IUserListProps) {
  const navigate = useNavigate();
  const { groupname } = props;
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState<string>('');
  const [isUserBanned, setUserBanned] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const { isLoading, data, error } = FetchUsersList(
    groupname,
    page,
    PaginationConfig.usersFollowingGroupLimit,
    'SOFTBANNED'
  );

  const onChangePaginationHandle = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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
      <Typography variant="h5">Thành viên đang cấm</Typography>
      <ModerateBanUser
        groupname={groupname}
        username={username}
        isBanned
        isOpen={isDialogOpen}
        onClose={closeModerateBanUserDialog}
      />
      <TableContainer component={Paper}>
        <TableHead>
          <TableCell>Tên người dùng</TableCell>
          <TableCell>Phân quyền</TableCell>
          <TableCell>Hạn cấm</TableCell>
          <TableCell>Tuỳ chọn khác</TableCell>
        </TableHead>
        <TableBody>
          {data?.users.map((user) => (
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

                <Button onClick={(e) => onClickBanUserButton(e, user.username)}>
                  Gỡ cấm
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Pagination
          count={data?.nPages}
          color="primary"
          onChange={onChangePaginationHandle}
        />
      </TableContainer>
    </ContentContainer>
  );
}

function FetchUsersList(
  groupname: string,
  page: number,
  limit: number,
  role: string
) {
  const { isLoading, data, error } = useSWR(
    `g/${groupname}/mod/users?page=${page}&limit=${limit}&role=${role}`,
    () => {
      return ModeratorService.fetchUserFollowingGroups(
        groupname,
        limit,
        page,
        role
      );
    }
  );
  return {
    isLoading,
    data,
    error,
  };
}

export default SoftBannedList;
