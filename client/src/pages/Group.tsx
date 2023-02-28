import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import GroupService from '../api/group';
import ContentContainer from '../components/common/mui/Layout';
import Loading from '../components/Loading';
import Post from '../components/post/Post';
import GroupLogo from '../assets/dev_purpose/gamingLogo.png';

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
    <>
      <ContentContainer>
        <img src={GroupLogo} alt="GroupLogo" />
        <Typography variant="h4">
          {groupInfo?.displayname || groupInfo?.groupname}
        </Typography>
        <Typography variant="subtitle2">g/{groupInfo?.groupname}</Typography>
        <Typography variant="subtitle2">360 người đã theo dõi nhóm</Typography>
        <Button variant="contained">Tham gia nhóm</Button>
      </ContentContainer>
      {posts && posts.map((p) => <Post key={p.id} postInfo={p} />)}
    </>
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
