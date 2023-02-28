import Typography, { TypographyProps } from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ResPost } from '../../../types/interfaces/resAPI';
import ContentContainer from '../common/mui/Layout';
import ReactionBar from './ReactionBar';

interface IProps {
  postInfo: ResPost;
}

const StyledPostBody = styled(Box)<BoxProps>({
  marginTop: '10px',
  marginBottom: '10px',
});

const StyledUsernameTypo = styled(Typography)<TypographyProps>({
  marginLeft: '20px',
});

const StyledPostImage = styled('img')({
  width: '100%',
});

function Post(props: IProps) {
  const { postInfo } = props;
  const { id, type, groupname, username, content } = postInfo;
  const navigate = useNavigate();

  function handleOnClickContainer(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    navigate(`/g/${groupname}/post/${id}`);
  }
  function handleOnClickLinkButton(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
  }

  return (
    <ContentContainer
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        handleOnClickContainer(e)
      }
    >
      <Grid container>
        <Grid item xs={2}>
          <ReactionBar variant="post" id={id} />
        </Grid>
        <Grid item xs>
          <Stack>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
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
                <StyledUsernameTypo variant="subtitle2">
                  Đăng bởi u/{username}
                </StyledUsernameTypo>
              </Link>
            </Box>
            <Box>
              <Typography variant="h4" className="boldText">
                Đâu là tựa game tệ nhất 2022?
              </Typography>
            </Box>
            <StyledPostBody>{renderBody(type, content)}</StyledPostBody>
            <Box display="flex">
              <Button>
                <Typography variant="subtitle2">Báo cáo vi phạm</Typography>
              </Button>
              <Button>
                <Typography variant="subtitle2">Xoá bài viết</Typography>
              </Button>
              <Button>
                <Typography variant="subtitle2">Admin quản lý</Typography>
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </ContentContainer>
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
      return <StyledPostImage src={content} alt="postImage" />;
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
