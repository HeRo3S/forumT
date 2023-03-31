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
import { useNavigate } from 'react-router-dom';
import { POSTTYPE } from '../../types/enum';
import { ResGroupInfo } from '../../types/interfaces/resAPI';
import PostService from '../api/post';
import ContentContainer from '../components/common/Layout';
import Editor from '../components/common/richtextEditor/Editor';
import socket from '../services/socket-io';

const StyledSelectedImage = styled('img')({
  width: '100%',
});

function CreatePost() {
  const [groupname, setGroupname] = useState<string | null>('');
  const title = useRef('');
  const [content, setContent] = useState('');
  const [type, setType] = useState(POSTTYPE.DEFAULT);
  const navigate = useNavigate();

  const [groupnameInput, setGroupnameInput] = useState('');
  const [groupFetchList, setGroupFetchList] = useState<ResGroupInfo[]>([]);
  const [selectedImage, setSelectedImage] = useState<File>();

  useEffect(() => {
    socket.emit('search/group', groupnameInput);
  }, [groupnameInput]);

  socket.on('search/group/response', (groups) => {
    setGroupFetchList(groups);
  });

  const handleMediaContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   setSelectedImage(reader.result as string);
    // };
    setSelectedImage(file);
  };

  const handleOnchangeSearchMenu = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setGroupnameInput(newValue);
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
    const post = await PostService.createPost(groupname as string, requestPost);
    if (post && typeKey === 'MEDIA') {
      const formData = new FormData();
      formData.append('file', selectedImage as Blob);
      formData.append('postID', post.id.toString());
      const attachment = await PostService.uploadFile(formData);
    }
    if (post) navigate(`g/${post.groupname}/post/${post.id}`);
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
              src={selectedImage ? URL.createObjectURL(selectedImage) : ''}
              alt="selected"
            />
          </Box>
        );
      case POSTTYPE.ATTACHMENT:
        // TODO for attachment input
        break;
      case POSTTYPE.LINK:
        return <Editor value={content} setValue={setContent} />;
      case POSTTYPE.POLL:
        // TODO incoming poll feature
        break;
      default:
        return <Editor value={content} setValue={setContent} />;
    }
    return null;
  }
  return (
    <>
      <Typography variant="h4">Tạo bài đăng</Typography>
      <ContentContainer>
        <Autocomplete
          options={groupFetchList.map((group) => group.groupname)}
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
          <Input placeholder="Tiêu đề" onChange={handleOnchangeTitle} />
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
            <Button onClick={(e) => handleOnClickSubmitButton(e)}>Đăng</Button>
            <Button color="secondary">Huỷ</Button>
          </Box>
        </Stack>
      </ContentContainer>
    </>
  );
}

export default CreatePost;
