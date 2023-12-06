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
import PaginationConfig from '../../config/axios/pagination';
import { DemoteDialog } from '../dialog/OwnerPromoteDemote';

interface IUserListProps {
  groupname: string;
}
function ModeratorList(props: IUserListProps) {
  const navigate = useNavigate();
  const { groupname } = props;
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState<string>('');
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const { isLoading, data, error } = FetchUsersList(
    groupname,
    page,
    PaginationConfig.usersFollowingGroupLimit,
    'MODERATOR'
  );

  const onChangePaginationHandle = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  const closeOwnerDemoteDialog = () => {
    setDialogOpen(false);
  };
  const openOwnerDemoteDialog = () => {
    setDialogOpen(true);
  };

  const onClickViewProfileButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    usernameData: string
  ) => {
    navigate(`/u/${usernameData}`);
  };

  const onClickDemoteUserButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    usernameData: string
  ) => {
    setUsername(usernameData);
    openOwnerDemoteDialog();
  };

  return (
    <ContentContainer>
      <Typography variant="h5">Quản trị viên</Typography>
      <DemoteDialog
        groupname={groupname}
        username={username}
        isOpen={isDialogOpen}
        onClose={closeOwnerDemoteDialog}
      />
      <TableContainer component={Paper}>
        <TableHead>
          <TableCell>Tên người dùng</TableCell>
          <TableCell>Phân quyền</TableCell>
          <TableCell>Ngày được phân quyền</TableCell>
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
                {user.role === 'MODERATOR' && (
                  <Button
                    onClick={(e) => onClickDemoteUserButton(e, user.username)}
                  >
                    Hạ quyến
                  </Button>
                )}
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

export default ModeratorList;
