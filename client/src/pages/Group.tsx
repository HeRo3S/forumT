import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import GroupService from '../api/group';
import Loading from '../components/loading/Loading';
import Post from '../components/post/Post';

function Group() {
  const { groupname } = useParams();
  if (!groupname)
    return <Typography variant="h1">Can`&apos`t find groupname</Typography>;

  const { isGroupPostsLoading, posts, groupPostErrors } =
    FetchGroupPostsData(groupname);
  const { isGroupInfoLoading, groupInfo, groupInfoError } =
    FetchGroupInfo(groupname);

  if (groupPostErrors)
    return <Typography variant="h1">{groupPostErrors}</Typography>;
  if (groupInfoError)
    return <Typography variant="h1">{groupInfoError}</Typography>;

  if (isGroupInfoLoading || isGroupPostsLoading) return <Loading />;
  return (
    <div>
      <Typography variant="h4">g/{groupInfo?.groupname}</Typography>
      {posts && posts.map((p) => <Post key={p.id} postInfo={p} />)}
    </div>
  );
}

function FetchGroupPostsData(groupname: string) {
  const { isLoading, error, data } = useSWR(`g/${groupname}/posts`, () =>
    GroupService.getGroupPosts(groupname)
  );

  return {
    isGroupPostsLoading: isLoading,
    posts: data,
    groupPostErrors: error,
  };
}

function FetchGroupInfo(groupname: string) {
  const { isLoading, error, data } = useSWR(`g/${groupname}`, () =>
    GroupService.getGroupInfo(groupname)
  );
  return {
    isGroupInfoLoading: isLoading,
    groupInfo: data,
    groupInfoError: error,
  };
}

export default Group;
