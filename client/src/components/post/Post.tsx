import MessageIcon from '@mui/icons-material/Message';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ResPost } from '../../../types/interfaces/resAPI';
import './post.css';

interface IProps {
  postInfo: ResPost;
}
function Post(props: IProps) {
  const { postInfo } = props;
  const { id, type, groupname, username, content } = postInfo;
  const navigate = useNavigate();

  function handleOnClickContainer(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    navigate(`/g/${groupname}/post/${id}`);
  }
  function handleOnClickReactionButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
  }
  function handleOnClickLinkButton(e: React.MouseEvent<HTMLAnchorElement>) {
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
          <Link
            to={`/g/${groupname}`}
            onClick={(e) => handleOnClickLinkButton(e)}
          >
            <Typography variant="subtitle1" className="boldText">
              g/{groupname}
            </Typography>
          </Link>
          <Link
            to={`/u/${username}`}
            onClick={(e) => handleOnClickLinkButton(e)}
          >
            <Typography
              variant="subtitle1"
              className="grayText"
              sx={{ marginLeft: '20px' }}
            >
              Đăng bởi u/{username}
            </Typography>
          </Link>
        </Grid2>
        <Grid2 xs={12}>
          <Typography variant="h4" className="boldText">
            Đâu là tựa game tệ nhất 2022?
          </Typography>
        </Grid2>
        <Grid2 xs={12} className="postBody">
          {renderBody(type, content)}
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

function renderBody(type: string, content: string) {
  switch (type) {
    case 'DEFAULT':
      return (
        <Typography variant="body1" className="text">
          {content}
        </Typography>
      );
    case 'MEDIA':
      return <img src={content} alt="postImage" />;
    case 'LINK':
      return <Link to={content}>content</Link>;
    default:
      return (
        <Typography variant="body1" className="text">
          Cannot find post type!
        </Typography>
      );
  }
}

export default Post;
