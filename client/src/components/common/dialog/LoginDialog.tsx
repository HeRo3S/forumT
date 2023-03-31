import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => ({}));

interface ILoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginDialog(props: ILoginDialogProps) {
  const { isOpen, onClose } = props;

  function closeDialog(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClose();
  }

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Người dùng chưa đăng nhập</DialogTitle>
      <DialogContent>
        Để sử dụng tính năng này, vui lòng đăng nhập!
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(e) => closeDialog(e)}
        >
          Huỷ bỏ
        </Button>
        <Button variant="outlined">Đăng nhập</Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default LoginDialog;
