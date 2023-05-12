import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { Socket } from 'socket.io-client';
import PostService from '../api/post';
import Post from '../components/post/Post';
import Loading from '../components/Loading';
import Comment from '../components/post/Comment';
import { ContentContainer } from '../components/common/Layout';
import { useAppSelector } from '../redux/hook';
import Editor from '../components/common/richtextEditor/Editor';
import CommentService from '../api/comment';
import { ResComment } from '../../types/interfaces/resAPI';
import createSocket from '../services/socket-io';

function DetailPost() {
  const auth = useAppSelector((state) => state.auth);
  const { groupname, postID } = useParams();
  const [newComments, setNewComments] = useState<ResComment[]>([]);
  const [comment, setComment] = useState('');

  const { userInfo, accessToken } = auth;
  const socketRef = useRef<Socket>();
  useEffect(() => {
    if (postID) socketRef.current = createSocket(accessToken, +postID);
    if (socketRef.current) {
      socketRef.current.on('update/comment/response', (updatedComment) => {
        setNewComments((prevComments) => [...prevComments, updatedComment]);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('update/comment/response');
        socketRef.current.emit('leave/post', postID);
        socketRef.current.disconnect();
      }
    };
  }, [accessToken, postID]);

  if (!(groupname && postID))
    return (
      <Typography variant="h1">Cannot find groupname or post ID</Typography>
    );

  const {
    isLoading: isPostLoading,
    post,
    postInfoError,
  } = GetPostInfo(groupname, postID);
  const {
    isLoading: isCommentsLoading,
    comments,
    commentsError,
  } = GetPostComments(groupname, postID);

  if (isPostLoading || isCommentsLoading) return <Loading />;

  if (postInfoError || commentsError)
    return <Typography variant="h1">{postInfoError}</Typography>;

  const handleSubmitComment = () => {
    if (!socketRef?.current) return;
    socketRef.current.emit('update/comment', groupname, postID, comment);
  };

  if (!post) return <ContentContainer></ContentContainer>;
  return (
    <ContentContainer>
      <Post groupname={groupname} id={+postID} />
      <Typography variant="h5">Bình luận</Typography>
      {userInfo && (
        <>
          <Editor value={comment} setValue={setComment} />
          <Button onClick={handleSubmitComment}>Đăng</Button>
        </>
      )}
      {comments &&
        comments.map((c) => {
          return <Comment key={c.id} comment={c} />;
        })}
      {newComments &&
        newComments.map((c) => {
          return <Comment key={c.id} comment={c} />;
        })}
    </ContentContainer>
  );
}

function GetPostInfo(groupname: string, postID: string) {
  const { isLoading, data, error } = useSWR(
    `g/${groupname}/post/${postID}`,
    () => PostService.getPostInfo(groupname, postID),
    {
      revalidateOnFocus: false,
    }
  );
  return {
    isLoading,
    post: data,
    postInfoError: error,
  };
}

function GetPostComments(groupname: string, postID: string) {
  const { isLoading, data, error } = useSWR(
    `g/${groupname}/post/${postID}/comment`,
    () => CommentService.getPostComments(groupname, postID),
    {
      revalidateOnFocus: false,
    }
  );
  return {
    isLoading,
    comments: data,
    commentsError: error,
  };
}

export default DetailPost;
