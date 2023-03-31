import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useSWR from 'swr';
import HomeService from '../api/home';
import Post from '../components/post/Post';
import { useAppSelector } from '../redux/hook';

function Home() {
  const user = useAppSelector((state) => state.auth);

  const { isLoading, posts, fetchDefaultPostsError } = FetchDefaultPosts();

  if (fetchDefaultPostsError)
    return <Typography variant="h1">{fetchDefaultPostsError}</Typography>;

  return (
    <Box>
      {posts &&
        posts.map((p) => {
          const { post } = p;
          const { id } = post;
          return <Post key={id} postInfo={p} />;
        })}
      ;
    </Box>
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
