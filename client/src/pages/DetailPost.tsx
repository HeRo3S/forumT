import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PostService from '../api/post';
import Post from '../components/post/Post';
import Loading from '../components/loading/Loading';

function DetailPost() {
  const { groupname, postID } = useParams();
  if (!(groupname && postID))
    return (
      <Typography variant="h1">Cannot find groupname or post ID</Typography>
    );
  const { isLoading, post, postInfoError } = GetPostInfo(groupname, postID);

  if (isLoading) return <Loading />;

  if (postInfoError)
    return <Typography variant="h1">{postInfoError}</Typography>;
  if (post) return <Post postInfo={post} />;
}

function GetPostInfo(groupname: string, postID: string) {
  const { isLoading, data, error } = useSWR(
    `g/${groupname}/post/${postID}`,
    () => PostService.getPostInfo(groupname, postID)
  );
  return {
    isLoading,
    post: data,
    postInfoError: error,
  };
}

export default DetailPost;
