import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import ReactionBar from './ReactionBar';
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
  const { comment } = props;
  const { id, username, content } = comment;
  const sanitizedHTMLContent = DOMPurify.sanitize(content);

  function handleOnClickContainer(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  );
  return (
    <ContentContainer>
      <Grid container>
        <Grid item xs={2}>
          {/* <ReactionBar variant="comment" id={id} /> */}
        </Grid>
        <Grid item xs>
          <Stack>
            <Box>
              <Link to={`/u/${username}`}>
                <StyledUsernameTypo variant="subtitle1">
                  u/{username}
                </StyledUsernameTypo>
              </Link>
            </Box>
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
