import {
  Button,
  TextField,
  Typography,
  Stack,
  Avatar,
  Box,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentContainer } from '../common/Layout';
import { ResGroupInfo } from '../../../types/interfaces/resAPI';
import ModeratorService from '../../api/moderator';

const StyledTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '20px',
  padding: '5px',
});

const StyledStack = styled(Stack)({
  paddingBottom: '10px',
});

const StyledAvatarContainer = styled(Box)({
  minWidth: '80%',
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: '80%',
}));

interface IProps {
  groupInfo: ResGroupInfo;
}
export default function GroupInfoForm(props: IProps) {
  const PUBLIC_FOLDER = import.meta.env.VITE_APP_API_URL;
  const { groupInfo } = props;
  const navigate = useNavigate();

  const [updateGroupInfo, setUpdateGroupInfo] = useState({ ...groupInfo });
  const [selectedAvatar, setSelectedAvatar] = useState<File>();

  const onChangeAvatarInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedAvatar(file);
  };

  const onClickUpdateInfoButton = async () => {
    const { groupname } = updateGroupInfo;
    const formData = new FormData();
    if (updateGroupInfo.displayname)
      formData.append('displayname', updateGroupInfo.displayname);
    if (updateGroupInfo.description)
      formData.append('description', updateGroupInfo.description);
    if (selectedAvatar) formData.append('file', selectedAvatar as Blob);
    const newUserInfo = await ModeratorService.updateGroupInfo({
      groupname,
      formData,
    });
    navigate(0, { replace: true });
  };

  return (
    <ContentContainer>
      <StyledTitle variant="h5">THAY ĐỔI THÔNG TIN NHÓM</StyledTitle>
      <StyledStack spacing={3} alignItems="center">
        <StyledAvatarContainer>
          <Typography variant="h6">Ảnh đại diện</Typography>
          <Grid container alignItems="center">
            <Avatar sx={{ height: '150px', width: '150px' }}>
              <img
                src={
                  selectedAvatar
                    ? URL.createObjectURL(selectedAvatar)
                    : PUBLIC_FOLDER + groupInfo.avatarURL
                }
                alt={groupInfo?.displayname || groupInfo.groupname}
                crossOrigin="use-credentials"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Avatar>

            <Button variant="outlined" component="label">
              Chọn ảnh mới
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => onChangeAvatarInput(e)}
              />
            </Button>
          </Grid>
        </StyledAvatarContainer>
        <StyledTextField
          label="Tên nhóm"
          variant="filled"
          disabled
          defaultValue={groupInfo?.groupname || ''}
        />
        <StyledTextField
          label="Tên hiển thị"
          defaultValue={groupInfo?.displayname}
          onChange={(e) => {
            setUpdateGroupInfo((prev) => {
              prev.displayname = e.target.value;
              return prev;
            });
          }}
        />
        <StyledTextField
          label="Miêu tả"
          defaultValue={groupInfo?.description}
          onChange={(e) => {
            setUpdateGroupInfo((prev) => {
              prev.description = e.target.value;
              return prev;
            });
          }}
        />
        <Button
          variant="contained"
          // disabled={JSON.stringify(updateUserInfo) === JSON.stringify(userInfo)}
          onClick={onClickUpdateInfoButton}
        >
          Thay đổi
        </Button>
      </StyledStack>
    </ContentContainer>
  );
}
