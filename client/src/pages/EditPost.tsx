import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  Input,
  Autocomplete,
  TextField,
  styled,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import useSWR from 'swr';
import DOMPurify from 'dompurify';
import { POSTTYPE } from '../../types/enum';
import { ResGroupInfo } from '../../types/interfaces/resAPI';
import PostService from '../api/post';
import { ContentContainer } from '../components/common/Layout';
import Editor from '../components/common/richtextEditor/Editor';
import createSocket from '../config/socket-io';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { showAlert } from '../redux/features/alertSlice';

const StyledSelectedImage = styled('img')({
  width: '100%',
});

function EditPost() {
  const PUBLIC_FOLDER = import.meta.env.VITE_APP_API_URL;
  const { groupname: groupnameParams, postID } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [groupname, setGroupname] = useState<string | null>(
    groupnameParams as string
  );
  const title = useRef('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<POSTTYPE>(POSTTYPE.DEFAULT);
  const socketRef = useRef<Socket>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [groupFetchList, setGroupFetchList] = useState<ResGroupInfo[]>([]);
  const [selectedImage, setSelectedImage] = useState<File>();

  const { data } = FetchPostInfo(
    groupnameParams as string,
    +(postID as string)
  );
  useEffect(() => {
    title.current = data?.post.title as string;
    setContent(DOMPurify.sanitize(data?.post.content as string));
    setType(POSTTYPE[data?.post.type as keyof typeof POSTTYPE]);
  }, [data]);

  useEffect(() => {
    socketRef.current = createSocket();
    if (socketRef.current) {
      socketRef.current.connect();
      socketRef.current.on('search/group/response', (groups) => {
        setGroupFetchList(groups);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('search/group/response');
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleMediaContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
  };

  const handleOnchangeSearchMenu = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (!socketRef.current) return;
    socketRef.current.emit('search/group', newValue);
  };

  const handleOnchangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    title.current = e.target.value;
  };

  const handleOnClickContentTypeButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: POSTTYPE
  ) => {
    e.preventDefault();
    setType(value);
  };

  const handleOnClickSubmitButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const typeKey = POSTTYPE[type];
    const requestPost = {
      title: title.current,
      content,
      type: typeKey,
    };
    try {
      const post = await PostService.updatePost(
        groupname as string,
        +(postID as string),
        requestPost
      );
      if (post && typeKey === 'MEDIA') {
        const formData = new FormData();
        formData.append('file', selectedImage as Blob);
        formData.append('postID', post.id.toString());
        await PostService.uploadFile(formData);
      }
      if (post) {
        dispatch(
          showAlert({
            severity: 'success',
            message: `Cập nhật bài viết thành công! ID: ${post.id}`,
          })
        );
        navigate(`/g/${post.groupname}/post/${post.id}`);
      }
    } catch (err) {
      if (err.response && err.response.data.message === 'User banned!')
        dispatch(
          showAlert({
            severity: 'error',
            message: `Người dùng đã bị cấm đăng bài ở nhóm ${
              err.response.data.userFollowingGroup.groupname
            } đển ${new Date(
              err.response.data.userFollowingGroup.timeUnbanned
            ).toLocaleString('vi-VN', {
              timeZone: 'Asia/Ho_Chi_Minh',
            })}!`,
          })
        );
      if (err.response && err.response.data === 'Group has been banned')
        dispatch(
          showAlert({
            severity: 'error',
            message: 'Nhóm hiện tại đang bị chặn bởi người quản trị!',
          })
        );
    }
  };

  function renderContentInput(currentType: POSTTYPE) {
    switch (currentType) {
      case POSTTYPE.DEFAULT:
        return <Editor value={content} setValue={setContent} />;
      case POSTTYPE.MEDIA:
        return (
          <Box>
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => handleMediaContentChange(e)}
              />
            </Button>
            <StyledSelectedImage
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : PUBLIC_FOLDER + (data?.attachments[0].url as string)
              }
              alt="selected"
            />
          </Box>
        );
      case POSTTYPE.ATTACHMENT:
        // TODO for attachment input
        break;
      case POSTTYPE.LINK:
        return (
          <TextField
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        );
      case POSTTYPE.POLL:
        // TODO incoming poll feature
        break;
      default:
        return <Editor value={content} setValue={setContent} />;
    }
    return null;
  }
  if (data?.post.username !== userInfo.username)
    return (
      <Typography>Từ chối truy cập. Không phài tác giả bài đăng</Typography>
    );
  return (
    <>
      <Typography variant="h4">Tạo bài đăng</Typography>
      <ContentContainer>
        <Autocomplete
          disabled
          options={groupFetchList.map((group) => group.groupname)}
          value={groupname}
          onChange={(event, value) => {
            setGroupname(value);
          }}
          onInputChange={(event, newInputData) =>
            handleOnchangeSearchMenu(event, newInputData)
          }
          filterOptions={(x) => x}
          renderInput={(params) => (
            <TextField
              {...params}
              // inputProps={params.inputProps}
              // InputLabelProps={params.InputLabelProps}
              label="Chọn nhóm"
            />
          )}
        />
      </ContentContainer>
      <ContentContainer sx={{ p: 1 }}>
        <Stack spacing={2}>
          <Input
            placeholder="Tiêu đề"
            value={title.current}
            onChange={handleOnchangeTitle}
          />
          <Box>
            <Grid container>
              <Grid item xs>
                <Button
                  onClick={(e) =>
                    handleOnClickContentTypeButton(e, POSTTYPE.DEFAULT)
                  }
                >
                  Bài viét
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={(e) =>
                    handleOnClickContentTypeButton(e, POSTTYPE.MEDIA)
                  }
                >
                  Hình ảnh
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={(e) =>
                    handleOnClickContentTypeButton(e, POSTTYPE.LINK)
                  }
                >
                  Link
                </Button>
              </Grid>
            </Grid>
            {renderContentInput(type)}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button onClick={(e) => handleOnClickSubmitButton(e)}>
              Cập nhật
            </Button>
            <Button color="secondary">Huỷ</Button>
          </Box>
        </Stack>
      </ContentContainer>
    </>
  );
}

function FetchPostInfo(groupname: string, postID: number) {
  const { isLoading, data, error } = useSWR(
    `g/${groupname}/post/${postID}`,
    () => PostService.getPostInfo(groupname, postID.toString())
  );
  return {
    isLoading,
    data,
    error,
  };
}
export default EditPost;
