import {
  Box,
  Button,
  Typography,
  TextField,
  styled,
  Stack,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { ContentContainer } from '../components/common/Layout';
import GroupService from '../api/group';
import createSocket from '../services/socket-io';

function CreateGroup() {
  const [groupname, setGroupname] = useState<string>('');
  const [displayname, setDisplayname] = useState<string>('');
  const [existedGroupname, setExistedGroupname] = useState<string>('');
  const socketRef = useRef<Socket>();

  const navigate = useNavigate();

  useEffect(() => {
    socketRef.current = createSocket();
    if (socketRef) {
      socketRef.current.connect();
      socketRef.current.emit('search/exact/group', groupname);
      socketRef.current.on('search/exact/group/response', (group) => {
        setExistedGroupname(group);
      });
    }

    return () => {
      if (socketRef.current)
        socketRef.current.off('search/exact/group/response');
    };
  }, [groupname]);

  const handleOnClickSubmitButton = async () => {
    if (displayname === '') setDisplayname(groupname);
    const res = await GroupService.createGroup(groupname, displayname);
    if (res) navigate('/');
  };

  const handleCancelButton = () => {
    navigate(-1);
  };
  return (
    <>
      <Typography variant="h4">Tạo nhóm</Typography>
      <ContentContainer>
        <Stack>
          <TextField
            onChange={(e) => setGroupname(e.target.value)}
            label="Tên nhóm"
          />
          {existedGroupname === groupname && (
            <Typography variant="subtitle2">Nhóm đã tồn tại</Typography>
          )}
          <TextField
            onChange={(e) => setDisplayname(e.target.value)}
            label="Tên hiển thị"
          />
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Button
            disabled={groupname === existedGroupname}
            onClick={handleOnClickSubmitButton}
          >
            Tạo
          </Button>
          <Button color="secondary" onClick={handleCancelButton}>
            Huỷ
          </Button>
        </Box>
      </ContentContainer>
    </>
  );
}

export default CreateGroup;
