import { Grid, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useSWRInfinite from 'swr/infinite';
import { useCallback, useEffect, useRef } from 'react';
import HomeService from '../api/home';
import { PageContainer } from '../components/common/Layout';
import Post from '../components/post/Post';
import LeftBar from '../components/LeftBar';
import { useAppSelector } from '../redux/hook';
import RightBar from '../components/RightBar';
import Loading from '../components/Loading';
import PaginationConfig from '../config/axios/pagination';

const StyledEndOfPostsDiv = styled('div')({
  height: '20px',
  marginBottom: '20px',
});

function Home() {
  const { accessToken } = useAppSelector((state) => state.auth);

  const { isLoading, data, fetchDefaultPostsError, size, setSize } =
    FetchDefaultPosts(accessToken);

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

  if (!data) return <Loading />;

  if (fetchDefaultPostsError)
    return <Typography variant="h1">{fetchDefaultPostsError}</Typography>;

  return (
    <PageContainer container>
      <LeftBar />
      <Grid item xs={8}>
        <Box>
          {data?.length && (
            <>
              {data.map((page) => {
                return page.posts.map((p) => {
                  const { id, groupname } = p;
                  return <Post key={id} groupname={groupname} id={id} />;
                });
              })}
            </>
          )}
          <StyledEndOfPostsDiv ref={endOfPostsRef} />
        </Box>
      </Grid>
      <RightBar />
    </PageContainer>
  );
}

function FetchDefaultPosts(accessToken: string) {
  const { isLoading, data, error, size, setSize } = useSWRInfinite(
    // *setup req URL
    (cursor, previousData) => {
      if (previousData && previousData.nextCursorID === -1) return null;
      let URL = '';
      if (accessToken === '') URL = 'home/posts/guest';
      else URL = '/home/posts/user';
      URL += `?limit=${PaginationConfig.homePostsLimit}`;
      // console.log(previousData);
      if (previousData?.nextCursorID && previousData?.nextCursorID !== -1)
        URL += `&cursor=${previousData?.nextCursorID}`;
      return URL;
    },
    HomeService.basicFetcher,
    { revalidateFirstPage: false }
  );

  return {
    isLoading,
    data,
    fetchDefaultPostsError: error,
    size,
    setSize,
  };
}

export default Home;
