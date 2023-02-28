import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography, { TypographyProps } from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from '../common/mui/Layout';
import ReactionBar from './ReactionBar';

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

function Comment() {
  function handleOnClickContainer(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  );
  return (
    <ContentContainer>
      <Grid container>
        <Grid item xs={2}>
          <ReactionBar variant="comment" id={1} />
        </Grid>
        <Grid item xs>
          <Stack>
            <Box>
              <Link to="/u/123" onClick={(e) => handleOnClickLinkButton(e)}>
                <StyledUsernameTypo variant="subtitle1">
                  u/hung123
                </StyledUsernameTypo>
              </Link>
            </Box>
            <StyledPostBody>Bài viểt hay quá!</StyledPostBody>
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
