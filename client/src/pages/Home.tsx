import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useSWR from 'swr';
import HomeService from '../api/home';
import { PageContainer } from '../components/common/Layout';
import Post from '../components/post/Post';
import LeftBar from '../components/LeftBar';
import { useAppSelector } from '../redux/hook';
import RightBar from '../components/RightBar';

function Home() {
  const user = useAppSelector((state) => state.auth);

  const { isLoading, posts, fetchDefaultPostsError } = FetchDefaultPosts();

  if (fetchDefaultPostsError)
    return <Typography variant="h1">{fetchDefaultPostsError}</Typography>;

  return (
    <PageContainer container>
      <LeftBar />
      <Grid item xs={8}>
        <Box>
          {posts &&
            posts.map((p) => {
              const { id, groupname } = p;
              return <Post key={id} groupname={groupname} id={id} />;
            })}
          ;
        </Box>
      </Grid>
      <RightBar />
    </PageContainer>
  );
}

function FetchDefaultPosts() {
  const { isLoading, data, error } = useSWR('/g/default/posts', () =>
    HomeService.fetchDefaultPosts()
  );

  return {
    isLoading,
    posts: data,
    fetchDefaultPostsError: error,
  };
}

export default Home;
