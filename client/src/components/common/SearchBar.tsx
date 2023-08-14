import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import createSocket from '../../config/socket-io';
import { ResGroupInfo, ResPost } from '../../../types/interfaces/resAPI';

interface IGroupOption extends ResGroupInfo {
  category: string;
}

interface IPostOption extends ResPost {
  category: string;
}

function SearchBar() {
  const socketRef = useRef<Socket>();
  const navigate = useNavigate();

  const [groupFetchList, setGroupFetchList] = useState<ResGroupInfo[]>([]);
  const [postFetchList, setPostFetchList] = useState<ResPost[]>([]);

  useEffect(() => {
    socketRef.current = createSocket();
    if (socketRef.current) {
      socketRef.current.connect();
      socketRef.current.on('search/group/response', (groups) => {
        setGroupFetchList(groups);
      });
      socketRef.current.on('search/post/response', (posts) => {
        setPostFetchList(posts);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('search/group/response');
        socketRef.current.off('search/post/response');
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleOnInputChangeSearchMenu = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (!socketRef.current) return;
    socketRef.current.emit('search/group', newValue);
    socketRef.current.emit('search/post', newValue);
  };

  const handleOnValueChangeSearchMenu = (
    event: any,
    newValue: IGroupOption | IPostOption | string | null
  ) => {
    if (newValue === null || typeof newValue === 'string') return;
    switch (newValue.category) {
      case 'group':
        navigate(`/g/${(newValue as IGroupOption).groupname}`);
        break;
      case 'post': {
        const post = newValue as IPostOption;
        navigate(`/g/${post.groupname}/post/${post.id}`);
        break;
      }
      default:
    }
  };

  return (
    <Box>
      <Autocomplete
        freeSolo
        size="small"
        options={[
          ...groupFetchList.map((group) => ({ ...group, category: 'group' })),
          ...postFetchList.map((post) => ({ ...post, category: 'post' })),
        ]}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => {
          if (option === null || typeof option === 'string') return null;
          switch (option.category) {
            case 'group':
              return option.groupname;
            case 'post':
              return option.title;
            default:
              return 'error';
          }
        }}
        onChange={(event, value) => handleOnValueChangeSearchMenu(event, value)}
        onInputChange={(event, newInputData) =>
          handleOnInputChangeSearchMenu(event, newInputData)
        }
        filterOptions={(x) => x}
        renderInput={(params) => <TextField {...params} label="Tìm kiếm" />}
        renderGroup={(params) => (
          <li key={params.key}>
            <Typography variant="subtitle1">
              {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                renderGroupHeader(params.group)
              }
            </Typography>
            <ul>{params.children}</ul>
          </li>
        )}
      />
    </Box>
  );
}

const renderGroupHeader = (category: string) => {
  switch (category) {
    case 'group':
      return 'Nhóm';
    case 'post':
      return 'Bài viết';
    default:
      return 'error';
  }
};

export default SearchBar;
