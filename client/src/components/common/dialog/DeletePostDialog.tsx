import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => ({}));

interface IDeletePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  handleOnClickConfirmButton: () => void;
}

function DeletePostDialog(props: IDeletePostDialogProps) {
  const { isOpen, onClose, handleOnClickConfirmButton } = props;

  const closeDialog = () => {
    onClose();
  };

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Xoá bài viết</DialogTitle>
      <DialogContent>Bạn có chắc chắn muốn xoá bài viết?</DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={closeDialog}>
          Huỷ bỏ
        </Button>
        <Button variant="outlined" onClick={handleOnClickConfirmButton}>
          Xác nhận
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default DeletePostDialog;
