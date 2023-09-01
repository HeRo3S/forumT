import {
  Checkbox,
  DialogContentText,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import ModeratorService from '../../api/moderator';
import { showAlert } from '../../redux/features/alertSlice';
import { useAppDispatch } from '../../redux/hook';

const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => ({}));

interface IProps {
  isBanned: boolean | false;
  groupname: string;
  username: string;
  isOpen: boolean | false;
  onClose: () => void;
}
function ModerateBanUser(props: IProps) {
  const { isBanned, groupname, username, isOpen, onClose } = props;
  const dispatch = useAppDispatch();
  const [banTime, setBanTime] = useState('');

  const closeDialog = () => {
    onClose();
  };

  const onChangeBanTimeSelect = (e: SelectChangeEvent) => {
    setBanTime(e.target.value);
  };

  const handleOnClickBanUsers = async () => {
    const banRes = await ModeratorService.banUser(groupname, banTime, username);

    dispatch(
      showAlert({
        severity: 'success',
        message: `Cẩm người dùng ${banRes.username} đến ${new Date(
          banRes.timeUnbanned
        ).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
      })
    );

    closeDialog();
  };

  const handleOnClickUnbanUsers = async () => {
    const banRes = await ModeratorService.unbanUser(groupname, username);

    dispatch(
      showAlert({
        severity: 'success',
        message: `Gỡ cẩm người dùng ${banRes.username} thành công!`,
      })
    );

    closeDialog();
  };

  if (isBanned)
    return (
      <StyledDialog open={isOpen}>
        <DialogTitle>Quản lý thành viên</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {`Gỡ cẩm người dùng ${username}?`}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={closeDialog}>
            Huỷ bỏ
          </Button>
          <Button variant="outlined" onClick={handleOnClickUnbanUsers}>
            Đồng ý
          </Button>
        </DialogActions>
      </StyledDialog>
    );

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Quản lý thành viên</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          {`Người dùng ${username} sẽ bị cấm. Đồng ý?`}
        </Typography>
      </DialogContent>
      <DialogContent>
        <DialogContentText>Thời gian cấm</DialogContentText>
        <FormControl>
          <div>
            <Select onChange={onChangeBanTimeSelect} defaultValue="5m">
              <MenuItem value="5m">5 phút</MenuItem>
              <MenuItem value="7d">7 ngày</MenuItem>
              <MenuItem value="14d">14 ngày</MenuItem>
              <MenuItem value="30d">30 ngày</MenuItem>
            </Select>
          </div>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={closeDialog}>
          Huỷ bỏ
        </Button>
        <Button variant="outlined" onClick={handleOnClickBanUsers}>
          Đồng ý
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default ModerateBanUser;
