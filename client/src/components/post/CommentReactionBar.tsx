/* eslint-disable react/jsx-no-bind */
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAlt from '@mui/icons-material/ThumbDownOffAlt';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import useSWR from 'swr';
import { REACTION } from '../../../types/enum';
import {
  ReactionStatsProps,
  ResComment,
  ResPost,
} from '../../../types/interfaces/resAPI';
import { useAppSelector } from '../../redux/hook';
import LoginDialog from '../dialog/LoginDialog';
import PostService from '../../api/post';

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
  variant: 'comment';
  comment: ResComment;
  reaction: ReactionStatsProps;
}

function ReactionBar(props: IProps) {
  const { variant, post, reaction: stats } = props;
  const { id, groupname } = post;
  const { nUpvote, nDownvote, nComments } = stats || {};
  const user = useAppSelector((state) => state.auth.userInfo);
  const [reaction, setReaction] = useState(REACTION.NONE);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  const { isLoading, data, error } = FetchUserPostReaction(groupname, id, user);

  useEffect(() => {
    if (error) {
      console.error('Problem fetching user reaction!');
      return;
    }
    const userExistedReaction = data?.reaction;
    if (userExistedReaction)
      setReaction(
        REACTION[userExistedReaction as keyof typeof REACTION] || REACTION.NONE
      );
  }, [data, error]);

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
    if (value === reaction) {
      setReaction(REACTION.NONE);
    } else {
      setReaction(value);
    }
  }

  function openLoginDialog() {
    setLoginDialogOpen(true);
  }
  function closeLoginDialog() {
    setLoginDialogOpen(false);
  }

  return (
    <>
      <LoginDialog isOpen={isLoginDialogOpen} onClose={closeLoginDialog} />
      <StyledReactionBar>
        <StyledReactionButton
          reaction={REACTION.UPVOTE}
          startIcon={renderReactionStartIcon(REACTION.UPVOTE, reaction)}
          size={variant === 'comment' ? 'small' : 'medium'}
          reactState={reaction}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleOnClickReactionButton(e, REACTION.UPVOTE)
          }
        >
          <Typography variant={variant === 'comment' ? 'subtitle1' : 'h6'}>
            {nUpvote}
          </Typography>
        </StyledReactionButton>
        <StyledReactionButton
          reaction={REACTION.DOWNVOTE}
          startIcon={renderReactionStartIcon(REACTION.DOWNVOTE, reaction)}
          size={variant === 'comment' ? 'small' : 'medium'}
          reactState={reaction}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleOnClickReactionButton(e, REACTION.DOWNVOTE)
          }
        >
          <Typography variant={variant === 'comment' ? 'subtitle1' : 'h6'}>
            {nDownvote}
          </Typography>
        </StyledReactionButton>
        {variant === 'post' && (
          <StyledCommentsButton startIcon={<ChatBubbleOutlineIcon />}>
            <Typography variant="h6">{nComments}</Typography>
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

export default ReactionBar;
