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
import React, { useState } from 'react';
import { ContentContainer } from '../common/Layout';
import ModeratorService from '../../api/moderator';
import ModerateBanUser from '../dialog/ModerateBanUser';
import PaginationConfig from '../../config/axios/pagination';
import { PromoteDialog } from '../dialog/OwnerPromoteDemote';

interface IUserListProps {
  groupname: string;
}
function UserList(props: IUserListProps) {
  const navigate = useNavigate();
  const { groupname } = props;
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState<string>('');
  const [isUserBanned, setUserBanned] = useState<boolean>(false);
  const [isBanDialogOpen, setBanDialogOpen] = useState<boolean>(false);
  const [isPromoteDialogOpen, setPromoteDialogOpen] = useState<boolean>(false);

  const { isLoading, data, error } = FetchUsersList(
    groupname,
    page,
    PaginationConfig.usersFollowingGroupLimit,
    'USER'
  );

  const onChangePaginationHandle = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  const closeModerateBanUserDialog = () => {
    setBanDialogOpen(false);
  };
  const openModerateBanUserDialog = () => {
    setBanDialogOpen(true);
  };

  const closeOwnerPromoteDialog = () => {
    setPromoteDialogOpen(false);
  };
  const openOwnerDemoteDialog = () => {
    setPromoteDialogOpen(true);
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
  const onClickPromoteToModButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    usernameData: string
  ) => {
    setUsername(usernameData);
    openOwnerDemoteDialog();
  };

  return (
    <ContentContainer>
      <Typography variant="h5">Người đang theo dõi</Typography>
      <ModerateBanUser
        groupname={groupname}
        username={username}
        isBanned={isUserBanned}
        isOpen={isBanDialogOpen}
        onClose={closeModerateBanUserDialog}
      />
      <PromoteDialog
        groupname={groupname}
        username={username}
        isOpen={isPromoteDialogOpen}
        onClose={closeOwnerPromoteDialog}
      />
      <TableContainer component={Paper}>
        <TableHead>
          <TableCell>Tên người dùng</TableCell>
          <TableCell>Phân quyền</TableCell>
          <TableCell>Ngày được gỡ cấm</TableCell>
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

                <Button
                  onClick={(e) => onClickPromoteToModButton(e, user.username)}
                >
                  Thăng cấp
                </Button>
                <Button onClick={(e) => onClickBanUserButton(e, user.username)}>
                  Cấm
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

export default UserList;
