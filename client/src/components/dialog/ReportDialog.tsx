import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControlLabel, FormGroup } from '@mui/material';
import { BannedReasons } from '../../config/variables';
import PostService from '../../api/post';
import { useAppDispatch } from '../../redux/hook';
import { showAlert } from '../../redux/features/alertSlice';

const StyledDialog = styled(Dialog)<DialogProps>(({ theme }) => ({}));

interface IPostReportDialogProps {
  groupname: string;
  postID: number;
  isOpen: boolean;
  onClose: () => void;
}

function PostReportDialog(props: IPostReportDialogProps) {
  const { isOpen, onClose, postID, groupname } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [reason, setReason] = useState<string>('');

  const closeDialog = () => {
    onClose();
  };

  const onClickCheckboxOption = (
    e: ChangeEvent<HTMLInputElement>,
    _reason: string
  ) => {
    if (_reason === reason) setReason('');
    else setReason(_reason);
  };

  const handleOnClickReport = async () => {
    if (reason === '') return;
    const res = await PostService.postReport(groupname, postID, reason);
    if (res)
      dispatch(
        showAlert({
          severity: 'success',
          message: `Bảo cảo thành công. ID ${res.id}`,
        })
      );
    navigate('/login');
  };

  return (
    <StyledDialog open={isOpen}>
      <DialogTitle>Báo cáo vi phạm</DialogTitle>
      <DialogContent>
        <FormGroup>
          {BannedReasons.map((r) => {
            return (
              <FormControlLabel
                key={r.code}
                control={
                  <Checkbox
                    checked={reason === r.code}
                    onChange={(e) => onClickCheckboxOption(e, r.code)}
                  />
                }
                label={r.vi}
              />
            );
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={closeDialog}>
          Huỷ bỏ
        </Button>
        <Button variant="outlined" onClick={handleOnClickReport}>
          Báo cáo
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default PostReportDialog;
