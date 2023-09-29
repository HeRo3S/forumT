import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import ModeratorService from '../../api/moderator';
import { useAppDispatch } from '../../redux/hook';
import { showAlert } from '../../redux/features/alertSlice';

const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => ({}));

interface ILoginDialogProps {
  username: string;
  groupname: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PromoteDialog(props: ILoginDialogProps) {
  const { username, groupname, isOpen, onClose } = props;
  const dispatch = useAppDispatch();

  const closeDialog = () => {
    onClose();
  };

  const handleOnClickPromote = async () => {
    try {
      const userFollowingGroup = await ModeratorService.promoteUserToMod(
        groupname,
        username
      );
      if (userFollowingGroup) {
        dispatch(
          showAlert({
            severity: 'success',
            message: `Đã thăng cấp ngưới dúng ${userFollowingGroup.username} thành công!`,
          })
        );
        closeDialog();
      }
    } catch (err) {
      dispatch(showAlert({ severity: 'error', message: err }));
    }
  };

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Thăng cấp người dùng lên quản trị viên</DialogTitle>
      <DialogContent>
        {`Bạn có muốn nâng quyền ngưới dùng ${username} lên làm quản trị viên?`}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={closeDialog}>
          Huỷ bỏ
        </Button>
        <Button variant="outlined" onClick={handleOnClickPromote}>
          Đồng ý
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export function DemoteDialog(props: ILoginDialogProps) {
  const { username, groupname, isOpen, onClose } = props;
  const dispatch = useAppDispatch();

  const closeDialog = () => {
    onClose();
  };

  const handleOnClickDemote = async () => {
    try {
      const userFollowingGroup = await ModeratorService.demoteModToUser(
        groupname,
        username
      );
      if (userFollowingGroup) {
        dispatch(
          showAlert({
            severity: 'success',
            message: `Đã thăng cấp ngưới dúng ${userFollowingGroup.username} thành công!`,
          })
        );
        closeDialog();
      }
    } catch (err) {
      dispatch(showAlert({ severity: 'error', message: err }));
    }
  };

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Thăng cấp người dùng lên quản trị viên</DialogTitle>
      <DialogContent>
        {`Bạn có muốn hạ quyền của quản trị viên ${username}?`}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={closeDialog}>
          Huỷ bỏ
        </Button>
        <Button variant="outlined" onClick={handleOnClickDemote}>
          Đồng ý
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}
