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
import AdminBlockGroupDialog from '../dialog/AdminBlockGroupDialog';

function NonBannedGroupsList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [groupname, setGroupname] = useState<string>('');
  const [isBanDialogOpen, setBanDialogOpen] = useState<boolean>(false);

  const { isLoading, data, error } = FetchGroupsList(
    page,
    PaginationConfig.usersFollowingGroupLimit,
    ['ACTIVE', 'INACTIVE']
  );

  const onChangePaginationHandle = (
    e: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const closeAdminBanGroupDialog = () => {
    setBanDialogOpen(false);
  };
  const openAdminBanGroupDialog = () => {
    setBanDialogOpen(true);
  };

  const onClickViewGroupButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    groupnameData: string
  ) => {
    navigate(`/g/${groupnameData}`);
  };

  const onClickBanUserButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    groupnameData: string
  ) => {
    setGroupname(groupnameData);
    openAdminBanGroupDialog();
  };

  return (
    <>
      <AdminBlockGroupDialog
        isBanned={false}
        groupname={groupname}
        isOpen={isBanDialogOpen}
        onClose={closeAdminBanGroupDialog}
      />
      <ContentContainer>
        <Typography variant="h5">Nhóm thông thường</Typography>
        <TableContainer component={Paper}>
          <TableHead>
            <TableCell>Groupname</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Tuỳ chọn khác</TableCell>
          </TableHead>
          <TableBody>
            {data?.groups.map((g) => (
              <TableRow key={g.id}>
                <TableCell>{g.groupname}</TableCell>
                <TableCell>{g.ownername}</TableCell>
                <TableCell>{g.status}</TableCell>
                {/* <TableCell>
                {new Date(g.createdAt).toLocaleString('vi-VN', {
                  timeZone: 'Asia/Ho_Chi_Minh',
                })}
              </TableCell> */}
                <TableCell>
                  <Button
                    onClick={(e) => onClickViewGroupButton(e, g.groupname)}
                  >
                    Xem nhóm
                  </Button>

                  <Button onClick={(e) => onClickBanUserButton(e, g.groupname)}>
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
    </>
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

export default NonBannedGroupsList;
