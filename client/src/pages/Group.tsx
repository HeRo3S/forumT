import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Grid from '@mui/material/Grid';
import GroupService from '../api/group';
import { ContentContainer, PageContainer } from '../components/common/Layout';
import Loading from '../components/Loading';
import Post from '../components/post/Post';
import GroupLogo from '../assets/dev_purpose/gamingLogo.png';
import LeftBar from '../components/LeftBar';

function Group() {
  const { groupname } = useParams();
  if (!groupname)
    return <Typography variant="h1">Can`&apos`t find groupname</Typography>;

  const { isGroupPostsLoading, posts, groupPostErrors } =
    FetchGroupPostsData(groupname);
  const {
    isGroupInfoLoading,
    data: fetchGroupInfoData,
    groupInfoError,
  } = FetchGroupInfo(groupname);

  if (groupPostErrors)
    return <Typography variant="h1">{groupPostErrors}</Typography>;
  if (groupInfoError)
    return <Typography variant="h1">{groupInfoError}</Typography>;

  if (isGroupInfoLoading || isGroupPostsLoading) return <Loading />;
  const { groupInfo, nFollowers } = fetchGroupInfoData || {};

  return (
    <PageContainer container>
      <LeftBar />
      <Grid item xs={8}>
        <ContentContainer>
          <img src={GroupLogo} alt="GroupLogo" />
          <Typography variant="h4">
            {groupInfo?.displayname || groupInfo?.groupname}
          </Typography>
          <Typography variant="subtitle2">g/{groupInfo?.groupname}</Typography>
          <Typography variant="subtitle2">
            {nFollowers} người đã theo dõi nhóm
          </Typography>
          <Button variant="contained">Tham gia nhóm</Button>
        </ContentContainer>
        {posts &&
          posts.map((p) => {
            const { post } = p;
            const { id } = post;
            return <Post key={id} postInfo={p} />;
          })}
      </Grid>
    </PageContainer>
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
    data,
    groupInfoError: error,
  };
}

export default Group;
