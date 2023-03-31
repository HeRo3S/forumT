import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import PostService from '../api/post';
import Post from '../components/post/Post';
import Loading from '../components/Loading';
import Comment from '../components/post/Comment';
import ContentContainer from '../components/common/Layout';
import { useAppSelector } from '../redux/hook';
import Editor from '../components/common/richtextEditor/Editor';

function DetailPost() {
  const { groupname, postID } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);

  if (!(groupname && postID))
    return (
      <Typography variant="h1">Cannot find groupname or post ID</Typography>
    );

  const { isLoading, post, postInfoError } = GetPostInfo(groupname, postID);
  if (isLoading) return <Loading />;

  if (postInfoError)
    return <Typography variant="h1">{postInfoError}</Typography>;

  if (post) {
    return (
      <ContentContainer>
        <Post postInfo={post} />
        <Typography variant="h5">Bình luận</Typography>
        {userInfo && <Editor />}
        {/* <Comment /> */}
      </ContentContainer>
    );
  }
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
