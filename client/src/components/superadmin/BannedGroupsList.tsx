import { useState } from 'react';
import useSWR from 'swr';
import {
  Button,
  Pagination,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PaginationConfig from '../../config/axios/pagination';
import SuperAdminService from '../../api/superadmin';
import { ContentContainer } from '../common/Layout';

function BannedGroupsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState<string>('');
  const [isUserBanned, setUserBanned] = useState<boolean>(false);
  const [isBanDialogOpen, setBanDialogOpen] = useState<boolean>(false);
  const [isPromoteDialogOpen, setPromoteDialogOpen] = useState<boolean>(false);

  const { isLoading, data, error } = FetchGroupsList(
    page,
    PaginationConfig.usersFollowingGroupLimit,
    ['BANNED']
  );

  const onChangePaginationHandle = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const closeModerateBanUserDialog = () => {
    setBanDialogOpen(false);
  };
  const openModerateBanUserDialog = () => {
    setBanDialogOpen(true);
  };

  const onClickViewGroupButton = (
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

  return (
    <ContentContainer>
      <Typography variant="h5">Nhóm đang cấm</Typography>
      <TableContainer component={Paper}>
        <TableHead>
          <TableCell>Groupname</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>Trạng thái</TableCell>
          <TableCell>Ngày bị cấm</TableCell>
          <TableCell>Tuỳ chọn khác</TableCell>
        </TableHead>
        <TableBody>
          {data?.groups.map((g) => (
            <TableRow key={g.id}>
              <TableCell>{g.groupname}</TableCell>
              <TableCell>{g.ownername}</TableCell>
              <TableCell>{g.status}</TableCell>
              <TableCell>
                {new Date(g.updatedAt).toLocaleString('vi-VN', {
                  timeZone: 'Asia/Ho_Chi_Minh',
                })}
              </TableCell>
              {/* <TableCell>
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
              </TableCell> */}
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

function FetchGroupsList(page: number, limit: number, status: string[]) {
  const { isLoading, data, error } = useSWR(
    [
      `superadmin/groups/list?status=${status}&page=${page}&limit=${limit}`,
      status,
    ],
    () => {
      return SuperAdminService.getAllGroups(status, limit, page);
    }
  );
  return {
    isLoading,
    data,
    error,
  };
}

export default BannedGroupsList;
