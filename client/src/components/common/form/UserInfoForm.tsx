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
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../api/user';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { updateUserInfo as updateUserInfoAction } from '../../../redux/features/authSlice';
import { ContentContainer } from '../Layout';
import { ResUserInfo } from '../../../../types/interfaces/resAPI';

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

export default function UserInfoForm() {
  const PUBLIC_FOLDER = import.meta.env.VITE_APP_API_URL;
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [updateUserInfo, setUpdateUserInfo] = useState({ ...userInfo });
  const [selectedAvatar, setSelectedAvatar] = useState<File>();

  useEffect(() => {
    console.log(JSON.stringify(updateUserInfo) === JSON.stringify(userInfo));
  }, [updateUserInfo, userInfo]);

  const onChangeAvatarInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedAvatar(file);
  };

  const onClickUpdateInfoButton = async (e: ChangeEvent<HTMLButtonElement>) => {
    const { username } = updateUserInfo;
    const formData = new FormData();
    formData.append('displayname', updateUserInfo.displayname);
    formData.append('description', updateUserInfo.description);
    if (selectedAvatar) formData.append('file', selectedAvatar as Blob);
    const newUserInfo = await UserService.updateUserInfo({
      username,
      formData,
    });
    dispatch(updateUserInfoAction(newUserInfo as ResUserInfo));
    navigate('/', { replace: true });
  };

  return (
    <ContentContainer>
      <StyledTitle variant="h5">THAY ĐỔI THÔNG TIN CÁ NHÂN</StyledTitle>
      <StyledStack spacing={3} alignItems="center">
        <StyledAvatarContainer>
          <Typography variant="h6">Ảnh đại diện</Typography>
          <Grid container alignItems="center">
            <Avatar
              sx={{ height: '150px', width: '150px' }}
              src={
                selectedAvatar
                  ? URL.createObjectURL(selectedAvatar)
                  : PUBLIC_FOLDER + userInfo.avatarURL
              }
              alt={userInfo.displayname || userInfo?.username}
            />
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
          label="Email"
          variant="filled"
          disabled
          defaultValue={userInfo?.email || ''}
        />
        <StyledTextField
          label="Tên người dùng"
          variant="filled"
          disabled
          defaultValue={userInfo?.username || ''}
        />
        <StyledTextField
          label="Tên hiển thị"
          defaultValue={userInfo?.displayname}
          onChange={(e) => {
            setUpdateUserInfo((prev) => {
              prev.displayname = e.target.value;
              return prev;
            });
          }}
        />
        <StyledTextField
          label="Thay đổi mật khẩu"
          type="password"
          defaultValue="aa@gmail.com"
        />
        <StyledTextField
          label="Nhập lại mật khẩu"
          type="password"
          defaultValue="aa@gmail.com"
        />
        <Button
          variant="contained"
          // disabled={JSON.stringify(updateUserInfo) === JSON.stringify(userInfo)}
          onClick={(e) => onClickUpdateInfoButton(e)}
        >
          Thay đổi
        </Button>
      </StyledStack>
    </ContentContainer>
  );
}
