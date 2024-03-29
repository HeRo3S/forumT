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
import {
  ContentContainer,
  GrayContentContainer,
} from '../components/common/Layout';
import GroupService from '../api/group';
import createSocket from '../config/socket-io';
import { useAppDispatch } from '../redux/hook';
import { showAlert } from '../redux/features/alertSlice';

function CreateGroup() {
  const [groupname, setGroupname] = useState<string>('');
  const [displayname, setDisplayname] = useState<string>('');
  const [existedGroupname, setExistedGroupname] = useState<string | null>(null);
  const socketRef = useRef<Socket>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketRef.current = createSocket();
    socketRef.current.connect();

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit('search/exact/group', groupname);
      socketRef.current.on('search/exact/group/response', (group) => {
        setExistedGroupname(group.groupname);
      });
    }

    // return () => {
    //   if (socketRef.current)
    //     socketRef.current.off('search/exact/group/response');
    // };
  }, [groupname]);

  const handleOnClickSubmitButton = async () => {
    if (displayname === '') setDisplayname(groupname);
    const res = await GroupService.createGroup(groupname, displayname);
    if (res) {
      dispatch(
        showAlert({
          severity: 'success',
          message: `Tạo nhóm ${res.groupname} thành công!`,
        })
      );
      navigate(`/g/${groupname}`);
    }
  };

  const handleCancelButton = () => {
    navigate(-1);
  };
  return (
    <>
      <GrayContentContainer>
        <Typography variant="h4">Tạo nhóm</Typography>
      </GrayContentContainer>
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
