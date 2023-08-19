import Typography, { TypographyProps } from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DOMPurify from 'dompurify';
import useSWR from 'swr';
import { ResAttachment } from '../../../types/interfaces/resAPI';
import { ContentContainer } from '../common/Layout';
import PostReactionBar from './PostReactionBar';
import PostService from '../../api/post';
import { useAppSelector } from '../../redux/hook';
import DeletePostDialog from '../common/dialog/DeletePostDialog';
import PostReportDialog from '../common/dialog/ReportDialog';
import Reports from './Reports';

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

interface IProps {
  id: number;
  groupname: string;
  modVariant?: boolean;
}

function Post(props: IProps) {
  const { id, groupname, modVariant } = props;
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isReportDialogOpen, setReportDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const openReportDialog = () => {
    setReportDialogOpen(true);
  };
  const closeReportDialog = () => {
    setReportDialogOpen(false);
  };

  function handleOnClickContainer(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    navigate(`/g/${groupname}/post/${id}`);
  }
  function handleOnClickLinkButton(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
  }

  async function handleOnclickDeletePostButton(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.stopPropagation();
    openDeleteDialog();
  }
  async function handleOnclickReportPostButton(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.stopPropagation();
    openReportDialog();
  }

  const handleOnClickConfirmDeletePost = async () => {
    const res = await PostService.deletePost(groupname, id);
    navigate(0);
  };

  const { isLoading, data: postInfo, error } = FetchPostInfo(groupname, id);
  if (error || !postInfo) return <Typography>Error</Typography>;
  const { post, reaction, attachments } = postInfo;
  const { type, username, title, content } = post;

  return (
    <>
      <DeletePostDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        handleOnClickConfirmButton={handleOnClickConfirmDeletePost}
      />
      <PostReportDialog
        postID={id}
        groupname={groupname}
        isOpen={isReportDialogOpen}
        onClose={closeReportDialog}
      />
      <ContentContainer
        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
          handleOnClickContainer(e)
        }
      >
        <Grid container>
          <Grid item xs={2}>
            <PostReactionBar variant="post" post={post} reaction={reaction} />
          </Grid>
          <Grid item xs>
            <Stack sx={{ paddingRight: '10px' }}>
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
                  {title}
                </Typography>
              </Box>
              <StyledPostBody>
                {renderBody(type, content, attachments)}
              </StyledPostBody>
              <Box display="flex">
                <Button onClick={(e) => handleOnclickReportPostButton(e)}>
                  <Typography variant="subtitle2">Báo cáo vi phạm</Typography>
                </Button>
                {userInfo?.username === username && (
                  <Button onClick={(e) => handleOnclickDeletePostButton(e)}>
                    <Typography variant="subtitle2">Xoá bài viết</Typography>
                  </Button>
                )}
                {modVariant && (
                  <Button>
                    <Typography variant="subtitle2">Admin quản lý</Typography>
                  </Button>
                )}
              </Box>
              <Reports groupname={groupname} postID={id} />
            </Stack>
          </Grid>
        </Grid>
      </ContentContainer>
    </>
  );
}

function renderBody(
  type: string,
  content: string,
  attachments: ResAttachment[]
) {
  const PUBLIC_FOLDER = import.meta.env.VITE_APP_API_URL;
  switch (type) {
    case 'DEFAULT':
      // eslint-disable-next-line no-case-declarations
      const sanitizedHTMLContent = DOMPurify.sanitize(content);
      return (
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: sanitizedHTMLContent }}
        />
      );
    case 'MEDIA':
      if (attachments.length === 0)
        return <Typography variant="h4">Error</Typography>;
      return (
        <StyledPostImage
          src={PUBLIC_FOLDER + attachments[0].url}
          alt="postImage"
        />
      );
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

function FetchPostInfo(groupname: string, postID: number) {
  const { isLoading, data, error } = useSWR(
    `g/${groupname}/post/${postID}`,
    () => PostService.getPostInfo(groupname, postID.toString())
  );
  return {
    isLoading,
    data,
    error,
  };
}

Post.defaultProps = {
  modVariant: false,
};

export default Post;
