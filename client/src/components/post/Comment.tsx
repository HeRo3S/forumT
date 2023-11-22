import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import useSWR from 'swr';
import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Avatar } from '@mui/material';
import { ContentContainer } from '../common/Layout';
import { ResComment } from '../../../types/interfaces/resAPI';

const StyledPostBody = styled(Box)<BoxProps>({
  marginTop: '10px',
  marginBottom: '10px',
});

const StyledUsernameTypo = styled(Typography)<TypographyProps>({
  fontWeight: 'bold',
});

const StyledPostImage = styled('img')({
  width: '100%',
});

interface ICommentProps {
  comment: ResComment;
}

function Comment(props: ICommentProps) {
  const PUBLIC_FOLDER = import.meta.env.VITE_APP_API_URL;
  const { comment } = props;
  const { user, content } = comment;
  const { username, avatarURL } = user;
  const sanitizedHTMLContent = DOMPurify.sanitize(content);

  // function handleOnClickContainer(
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
  // );
  return (
    <ContentContainer>
      <Grid container>
        <Grid item xs={2}>
          {/* <ReactionBar variant="comment" id={id} /> */}
        </Grid>
        <Grid item xs>
          <Stack>
            <Grid container>
              <Grid item xs={1}>
                <Avatar>
                  <img
                    src={PUBLIC_FOLDER + avatarURL}
                    alt={username}
                    crossOrigin="use-credentials"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Link to={`/u/${username}`}>
                  <StyledUsernameTypo variant="subtitle1">
                    u/{username}
                  </StyledUsernameTypo>
                </Link>
              </Grid>
            </Grid>
            <StyledPostBody
              dangerouslySetInnerHTML={{ __html: sanitizedHTMLContent }}
            />
            <Box display="flex">
              <Button size="small">
                <Typography variant="subtitle2">Báo cáo vi phạm</Typography>
              </Button>
              <Button>
                <Typography variant="subtitle2">Xoá bình luận</Typography>
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

export default Comment;
