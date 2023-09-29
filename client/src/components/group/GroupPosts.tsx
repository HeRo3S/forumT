import { Box, styled } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import useSWRInfinite from 'swr/infinite';
import Post from '../post/Post';
import PaginationConfig from '../../config/axios/pagination';
import GroupService from '../../api/group';

const StyledEndOfPostsDiv = styled('div')({
  marginBottom: '20px',
  height: '20px',
});

interface IProps {
  groupname: string;
  role?: string;
}
function GroupPosts(props: IProps) {
  const { groupname, role } = props;

  const endOfPostsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { isGroupPostsLoading, pages, groupPostErrors, size, setSize } =
    FetchGroupPostsData(groupname as string);

  const handleLoadMore: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          pages &&
          pages.length === size &&
          pages[pages.length - 1].nextCursorID !== -1
        ) {
          setSize(size + 1);
        }
      });
    },
    [setSize, size, pages]
  );

  useEffect(() => {
    const option = {
      root: null,
      threshold: 0,
      margin: 0,
    };
    if (endOfPostsRef.current) {
      observerRef.current = new IntersectionObserver(handleLoadMore, option);
      observerRef.current.observe(endOfPostsRef.current);
    }
    return () => {
      if (observerRef?.current) observerRef.current.disconnect();
    };
  }, [handleLoadMore]);

  const posts = pages?.map((page) => {
    const { groupPosts } = page;
    return groupPosts.map((p) => {
      const { id } = p;
      if (role && (role === 'MODERATOR' || role === 'OWNER'))
        return (
          <>
            <Post key={id} groupname={groupname} id={id} modVariant />;
          </>
        );
      return (
        <>
          <Post key={id} groupname={groupname} id={id} />;
        </>
      );
    });
  });

  return (
    <>
      {pages ? posts : <Box />}
      <StyledEndOfPostsDiv ref={endOfPostsRef} />
    </>
  );
}

function FetchGroupPostsData(groupname: string) {
  const { isLoading, error, data, size, setSize } = useSWRInfinite(
    (index, previousData) => {
      let url = `g/${groupname}/posts?limit=${PaginationConfig.groupPostsLimit}`;
      if (!previousData?.nextCursorID) return url;
      if (previousData.nextCursorID === -1) return null;
      url += `&cursor=${previousData.nextCursorID}`;
      return url;
    },
    (url) => GroupService.getGroupPosts(url)
  );

  return {
    isGroupPostsLoading: isLoading,
    pages: data,
    groupPostErrors: error,
    size,
    setSize,
  };
}

export default GroupPosts;
