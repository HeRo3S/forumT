/* eslint-disable react/jsx-no-bind */
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAlt from '@mui/icons-material/ThumbDownOffAlt';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import useSWR from 'swr';
import { Socket } from 'socket.io-client';
import { REACTION } from '../../../types/enum';
import {
  ReactionStatsProps,
  ResPost,
  ResPostReact,
} from '../../../types/interfaces/resAPI';
import { useAppSelector } from '../../redux/hook';
import LoginDialog from '../common/dialog/LoginDialog';
import PostService from '../../api/post';
import createSocket from '../../services/socket-io';

const StyledReactionBar = styled(Stack)({
  alignItems: 'center',
});

interface IButtonProps extends ButtonProps {
  reactState: REACTION;
  reaction: REACTION;
}
const StyledReactionButton = styled(Button)<IButtonProps>(
  ({ reactState, reaction, theme }) => ({
    color:
      reactState === reaction
        ? theme.palette.primary.main
        : theme.palette.grey[700],
  })
);

const StyledCommentsButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

interface IProps {
  variant: 'post';
  post: ResPost;
  reaction: ReactionStatsProps;
}

function PostReactionBar(props: IProps) {
  const { variant, post, reaction: stats } = props;
  const { id, groupname } = post;
  const { nUpvote, nDownvote, nComments } = stats || {};

  const { userInfo: user, accessToken } = useAppSelector((state) => state.auth);
  const [upvotes, setUpvotes] = useState(nUpvote);
  const [downvotes, setDownvotes] = useState(nDownvote);
  const [comments, setComments] = useState(nComments);
  const [reaction, setReaction] = useState(REACTION.NONE);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const socketRef = useRef<Socket>();

  const { isLoading, data, error } = FetchUserPostReaction(groupname, id, user);

  useEffect(() => {
    setReaction(REACTION[data?.reaction as keyof typeof REACTION]);
  }, [data]);

  useEffect(() => {
    socketRef.current = createSocket(accessToken, id);
    if (socketRef.current) {
      socketRef.current.on(
        'update/postReaction/response',
        (updatedComment: ResPostReact) => {
          setUpvotes(updatedComment.nUpvote as number);
          setDownvotes(updatedComment.nDownvote as number);
        }
      );
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off('update/postReaction/response');
        socketRef.current.emit('leave/post', id);
        socketRef.current.disconnect();
      }
    };
  }, [accessToken, id]);

  async function handleOnClickReactionButton(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: REACTION
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openLoginDialog();
      return;
    }
    let reactionKey;
    if (value === reaction) {
      setReaction(REACTION.NONE);
      reactionKey = 'NONE';
    } else {
      setReaction(value);
      reactionKey = Object.keys(REACTION).find(
        (key) => REACTION[key as keyof typeof REACTION] === value
      );
    }
    // await PostService.postUserReact(groupname, id, reactionKey as string);
    if (!socketRef.current) return;
    socketRef.current.emit('update/postReaction', id, reactionKey as string);
  }

  function openLoginDialog() {
    setLoginDialogOpen(true);
  }
  function closeLoginDialog() {
    setLoginDialogOpen(false);
  }

  if (error) return <Typography>error</Typography>;
  return (
    <>
      <LoginDialog isOpen={isLoginDialogOpen} onClose={closeLoginDialog} />
      <StyledReactionBar>
        <StyledReactionButton
          reaction={REACTION.UPVOTE}
          startIcon={renderReactionStartIcon(REACTION.UPVOTE, reaction)}
          size="medium"
          reactState={reaction}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleOnClickReactionButton(e, REACTION.UPVOTE)
          }
        >
          <Typography variant="h6">{upvotes}</Typography>
        </StyledReactionButton>
        <StyledReactionButton
          reaction={REACTION.DOWNVOTE}
          startIcon={renderReactionStartIcon(REACTION.DOWNVOTE, reaction)}
          size="medium"
          reactState={reaction}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleOnClickReactionButton(e, REACTION.DOWNVOTE)
          }
        >
          <Typography variant="h6">{downvotes}</Typography>
        </StyledReactionButton>
        {variant === 'post' && (
          <StyledCommentsButton startIcon={<ChatBubbleOutlineIcon />}>
            <Typography variant="h6">{comments}</Typography>
          </StyledCommentsButton>
        )}
      </StyledReactionBar>
    </>
  );
}

function renderReactionStartIcon(reaction: REACTION, reactState: REACTION) {
  switch (reaction) {
    case REACTION.UPVOTE:
      if (reaction === reactState) return <ThumbUpIcon />;
      return <ThumbUpOffAlt />;
    case REACTION.DOWNVOTE:
      if (reaction === reactState) return <ThumbDownIcon />;
      return <ThumbDownOffAlt />;
    default:
      return null;
  }
}

function FetchUserPostReaction(
  groupname: string,
  parentPostID: number,
  user: unknown
) {
  const { isLoading, data, error } = useSWR(
    () => {
      if (!user) return null;
      return `g/${groupname}/post/${parentPostID}/react`;
    },
    () => PostService.getUserReact(groupname, parentPostID)
  );
  return {
    isLoading,
    data,
    error,
  };
}

export default PostReactionBar;
