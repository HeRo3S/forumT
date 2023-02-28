import useSWR from 'swr';
import { ResPost } from '../../types/interfaces/resAPI';
import HomeService from '../api/home';
import Post from '../components/post/Post';
import { useAppSelector } from '../redux/hook';

function Home() {
  const user = useAppSelector((state) => state.auth);

  const { isLoading, posts, fetchDefaultPostsError } = FetchDefaultPosts();

  if (posts)
    return posts.map((p) => <Post key={p.id} postInfo={p as ResPost} />);
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
