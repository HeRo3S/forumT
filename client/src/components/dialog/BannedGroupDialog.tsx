import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledDialog = styled(Dialog)<DialogProps>({});

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

function BannedGroupDialog(props: IProps) {
  const { isOpen, onClose } = props;
  const navigate = useNavigate();

  const closeDialog = () => {
    onClose();
  };

  const handleOnClickNavigateBack = () => {
    navigate(-1);
  };

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Nhóm đang bị chặn</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Nhóm bạn đang muốn tìm đang bị chặn hoặc tạm dừng hoạt động. Bạn sẽ
          được điều hướng về trang trước đó.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={closeDialog}>
          Huỷ bỏ
        </Button>
        <Button variant="outlined" onClick={handleOnClickNavigateBack}>
          Đồng ý
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default BannedGroupDialog;
