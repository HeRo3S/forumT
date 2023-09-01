import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => ({}));

interface ILoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginDialog(props: ILoginDialogProps) {
  const { isOpen, onClose } = props;
  const navigate = useNavigate();

  const closeDialog = () => {
    onClose();
  };

  const handleOnClickLogin = () => {
    navigate('/login');
  };

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Người dùng chưa đăng nhập</DialogTitle>
      <DialogContent>
        Để sử dụng tính năng này, vui lòng đăng nhập!
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={closeDialog}>
          Huỷ bỏ
        </Button>
        <Button variant="outlined" onClick={handleOnClickLogin}>
          Đăng nhập
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default LoginDialog;
