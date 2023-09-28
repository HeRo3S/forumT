import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { showAlert } from '../../redux/features/alertSlice';
import { useAppDispatch } from '../../redux/hook';
import SuperAdminService from '../../api/superadmin';

const StyledDialog = styled(Dialog)<DialogProps>({});

interface IProps {
  isBanned: boolean | false;
  groupname: string;
  isOpen: boolean | false;
  onClose: () => void;
}
function AdminBlockGroupDialog(props: IProps) {
  const { isBanned, groupname, isOpen, onClose } = props;
  const dispatch = useAppDispatch();

  const closeDialog = () => {
    onClose();
  };

  const handleOnClickBanGroups = async () => {
    const banRes = await SuperAdminService.banGroup(groupname);

    dispatch(
      showAlert({
        severity: 'success',
        message: `Cẩm nhóm ${banRes.groupname} thành công!`,
      })
    );

    closeDialog();
  };

  const handleOnClickUnbanGroups = async () => {
    const banRes = await SuperAdminService.unbanGroup(groupname);

    dispatch(
      showAlert({
        severity: 'success',
        message: `Gỡ cẩm nhóm ${banRes.groupname} thành công!`,
      })
    );

    closeDialog();
  };

  if (isBanned)
    return (
      <StyledDialog open={isOpen}>
        <DialogTitle>Quản lý nhóm</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{`Gỡ cẩm nhóm ${groupname}?`}</Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeDialog}>
            Huỷ bỏ
          </Button>
          <Button variant="outlined" onClick={handleOnClickUnbanGroups}>
            Đồng ý
          </Button>
        </DialogActions>
      </StyledDialog>
    );

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Quản lý nhóm</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {`Nhóm ${groupname} sẽ bị cấm. Đồng ý?`}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={closeDialog}>
          Huỷ bỏ
        </Button>
        <Button variant="outlined" onClick={handleOnClickBanGroups}>
          Đồng ý
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default AdminBlockGroupDialog;
