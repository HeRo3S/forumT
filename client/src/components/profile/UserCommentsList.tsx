import useSWRInfinite from 'swr/infinite';
import Box from '@mui/material/Box';
import React, { useCallback, useEffect, useRef } from 'react';
import { Stack, Typography, styled } from '@mui/material';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import PaginationConfig from '../../config/axios/pagination';
import UserService from '../../api/user';
import { ContentContainer } from '../common/Layout';

const StyledCommentBox = styled(Box)({
  marginLeft: '20px',
  backgroundColor: '#f2f8fd',
});

interface IProps {
  username: string;
}

function UserCommentsList(props: IProps) {
  const { username } = props;
  const navigate = useNavigate();

  const { isLoading, data, error, size, setSize } = FetchUserComments(username);

  const endOfPostsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const handleLoadMore: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (data && data[data.length - 1].nextCursorID !== -1)
            setSize(size + 1);
        }
      });
    },
    [setSize, size, data]
  );
  useEffect(() => {
    const options = {
      root: null,
      margin: 0,
      threshold: 1,
    };

    if (endOfPostsRef.current) {
      observerRef.current = new IntersectionObserver(handleLoadMore, options);
      observerRef.current.observe(endOfPostsRef.current);
    }
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleLoadMore]);

  const onClickUserCommentContainer = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    groupname: string,
    parentPostID: number
  ) => {
    navigate(`/g/${groupname}/post/${parentPostID}`);
  };

  if (!data) return <Box />;
  const renderElements = data.map((page) => {
    return page.comments.map((p) => {
      const { id, content, parentPost, parentPostID } = p;
      const { groupname, title } = parentPost;

      const sanitizedHTMLContent = DOMPurify.sanitize(content);
      return (
        <ContentContainer
          key={id}
          onClick={(e) =>
            onClickUserCommentContainer(e, groupname, parentPostID)
          }
        >
          <Stack sx={{ padding: '15px' }}>
            <Typography>
              Tại bài viết <span style={{ fontWeight: 'bold' }}>{title}</span>{' '}
              của <span style={{ fontWeight: 'bold' }}>{`u/${username}`}</span>{' '}
              tại <span style={{ fontWeight: 'bold' }}>{`g/${groupname}`}</span>
            </Typography>
            <StyledCommentBox
              dangerouslySetInnerHTML={{ __html: sanitizedHTMLContent }}
            />
          </Stack>
        </ContentContainer>
      );
    });
  });
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{renderElements}</>;
}
function FetchUserComments(username: string) {
  const { isLoading, error, data, size, setSize } = useSWRInfinite(
    (cursor, previousData) => {
      if (previousData && previousData.nextCursorID === -1) return null;
      let URL = `u/${username}/comments`;
      URL += `?limit=${PaginationConfig.profilePostsLimit}`;
      if (previousData?.nextCursorID && previousData?.nextCursorID !== -1)
        URL += `&cursor=${previousData?.nextCursorID}`;
      return URL;
    },
    UserService.fetchUserComments,
    { revalidateFirstPage: false }
  );
  return {
    isLoading,
    data,
    error,
    size,
    setSize,
  };
}

export default UserCommentsList;
