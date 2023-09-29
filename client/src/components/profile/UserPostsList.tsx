import useSWRInfinite from 'swr/infinite';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useRef } from 'react';
import Post from '../post/Post';
import PaginationConfig from '../../config/axios/pagination';
import UserService from '../../api/user';

interface IProps {
  username: string;
}

function UserPostsList(props: IProps) {
  const { username } = props;

  const { isLoading, data, error, size, setSize } = FetchUserPosts(username);

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

  if (!data) return <Box />;
  const renderElements = data.map((page) => {
    return page.posts.map((p) => {
      const { id, groupname } = p;
      return <Post key={id} id={id} groupname={groupname} />;
    });
  });
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{renderElements}</>;
}
function FetchUserPosts(username: string) {
  const { isLoading, error, data, size, setSize } = useSWRInfinite(
    (cursor, previousData) => {
      if (previousData && previousData.nextCursorID === -1) return null;
      let URL = `u/${username}/posts`;
      URL += `?limit=${PaginationConfig.profilePostsLimit}`;
      if (previousData?.nextCursorID && previousData?.nextCursorID !== -1)
        URL += `&cursor=${previousData?.nextCursorID}`;
      return URL;
    },
    UserService.fetchUserPosts,
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

export default UserPostsList;
