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
import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ModeratorService from '../../api/moderator';
import { showAlert } from '../../redux/features/alertSlice';
import { useAppDispatch } from '../../redux/hook';

const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => ({}));

interface IProps {
  postID: number;
  groupname: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
}
function ModeratePost(props: IProps) {
  const { postID, groupname, username, isOpen, onClose } = props;
  const { URLGroupname, URLPostID } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [banUser, setBanUser] = useState(false);
  const [banTime, setBanTime] = useState('5m');

  const closeDialog = () => {
    onClose();
  };
  const onChangeBanTimeCheckBox = () => {
    setBanUser((prev) => !prev);
  };
  const onChangeBanTimeSelect = (e: SelectChangeEvent) => {
    setBanTime(e.target.value);
  };

  const handleOnClickBanPosts = async () => {
    const removeRes = await ModeratorService.hardDeletePost(groupname, postID);
    if (removeRes.status === 200)
      dispatch(
        showAlert({
          severity: 'success',
          message: `Xoá bài viết thành công!`,
        })
      );

    if (banUser) {
      const banRes = await ModeratorService.banUser(
        groupname,
        banTime,
        username
      );
      setTimeout(
        () =>
          dispatch(
            showAlert({
              severity: 'success',
              message: `Cẩm người dùng ${banRes.username} đến ${banRes.timeUnbanned}`,
            })
          ),
        1500
      );
    }
    closeDialog();
    if (URLPostID) navigate(-1);
  };

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Quản lý bài viết</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Bài viểt sẽ được xoá, bạn có đồng ý?
        </Typography>
      </DialogContent>
      <DialogContent>
        <DialogContentText>Tuỳ chọn nâng cao</DialogContentText>
        <FormControl>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={banUser}
                  onChange={onChangeBanTimeCheckBox}
                />
              }
              label="Cẩm người dùng đăng bài trong "
            />
            <Select onChange={onChangeBanTimeSelect} defaultValue={banTime}>
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
        <Button variant="outlined" onClick={handleOnClickBanPosts}>
          Đồng ý
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default ModeratePost;
