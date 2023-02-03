import MessageIcon from '@mui/icons-material/Message';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import postImage from '../../assets/dev_purpose/post.png';
import { ResPost } from '../../utils/interfaces/resAPI';
import './post.css';

interface IProps extends ResPost {
  variant: string;
}

function renderBody(type: string) {
  switch (type) {
    case 'DEFAULT':
      return (
        <Typography variant="body1" className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          placerat ligula ut mi consequat egestas a sed sapien. Maecenas
          commodo, velit id fringilla tincidunt, lacus est cursus odio, eu
          facilisis lacus quam in quam. Phasellus odio orci, varius id facilisis
          vel, molestie vel lectus. Donec interdum lorem et risus venenatis
          pretium. In id ex elit. Ut at vestibulum nulla, pellentesque auctor
          felis. Cras eu tellus a lectus pulvinar mollis eu quis lorem. Ut
          suscipit libero id venenatis ullamcorper. Nam id tempus lacus.
          Praesent tempus nulla at mauris euismod commodo. Nullam at diam auctor
          ex porta placerat. In vitae mauris dapibus, pellentesque ante sit
          amet, tempor mauris. Fusce vel felis eu tellus dapibus euismod.
          Phasellus suscipit dui enim, id porta ipsum consequat eu. Vivamus
          ultrices lorem felis, scelerisque interdum velit viverra eget. Fusce
          ut eleifend nulla. Ut id sem ornare, laoreet augue et, laoreet magna.
          In lacinia rutrum mauris, elementum aliquet mauris eleifend ac.
        </Typography>
      );
    case 'MEDIA':
      return <img src={postImage} alt="postImage" />;
    case 'LINK':
      return <Link to="google.com">google.com</Link>;
    default:
      return (
        <Typography variant="body1" className="text">
          Cannot find post type!
        </Typography>
      );
  }
}

function Post(props: IProps) {
  const { id, type, groupID, variant } = props;
  const navigate = useNavigate();

  function handleOnClickContainer(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    navigate(`/g/${groupID}/${id}`);
  }

  function handleOnClickReactionButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Container
      className="postContainer mainContainer"
      onClick={(e) => handleOnClickContainer(e)}
    >
      <Grid2 xs={3} className="reactionBar">
        <button type="button" className="reactionButton">
          <ThumbUpIcon fontSize="small" />
          <Typography variant="h6">1.2k</Typography>
        </button>
        <button
          type="button"
          className="reactionButton"
          onClick={(e) => handleOnClickReactionButton(e)}
        >
          <ThumbDownIcon fontSize="small" />
          <Typography variant="h6">1.2k</Typography>
        </button>
        <button
          type="button"
          className="reactionButton"
          onClick={(e) => handleOnClickReactionButton(e)}
        >
          <MessageIcon fontSize="small" />
          <Typography variant="h6">1.2k</Typography>
        </button>
      </Grid2>
      <Grid2 xs container className="contentBar">
        <Grid2 xs={12} display="flex" sx={{ marginTop: '10px' }}>
          <Typography variant="subtitle1" className="boldText">
            g/gaming
          </Typography>
          <Typography
            variant="subtitle1"
            className="grayText"
            sx={{ marginLeft: '20px' }}
          >
            Đăng bởi u/hung123
          </Typography>
        </Grid2>
        <Grid2 xs={12}>
          <Typography variant="h4" className="boldText">
            Đâu là tựa game tệ nhất 2022?
          </Typography>
        </Grid2>
        <Grid2 xs={12} className="postBody">
          {renderBody(type)}
        </Grid2>
        <Grid2 xs={12} display="flex">
          <button type="button">
            <Typography variant="subtitle2" className="grayText">
              Báo cáo vi phạm
            </Typography>
          </button>
          <button type="button">
            <Typography variant="subtitle2" className="grayText">
              Xoá bài viết
            </Typography>
          </button>
          <button type="button">
            <Typography variant="subtitle2" className="grayText">
              Admin quản lý
            </Typography>
          </button>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Post;
