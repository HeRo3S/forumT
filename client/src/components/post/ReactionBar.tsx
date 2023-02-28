import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAlt from '@mui/icons-material/ThumbDownOffAlt';
import Typography from '@mui/material/Typography';
import Button, { ButtonProps } from '@mui/material/Button';
import { REACTION } from '../../../types/enum';

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
      reactState === reaction ? theme.palette.primary : theme.palette.grey[700],
  })
);

const StyledCommentsButton = styled(Button)(({ theme }) => ({
  color: theme.palette.grey[700],
}));

interface IProps {
  variant: 'post' | 'comment';
  id: number;
}
function ReactionBar(props: IProps) {
  const { variant, id } = props;
  const [reaction, setReaction] = useState(REACTION.NONE);

  function handleOnClickReactionButton(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: REACTION
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (value === reaction) {
      setReaction(REACTION.NONE);
    } else {
      setReaction(value);
    }
  }

  return (
    <StyledReactionBar>
      <StyledReactionButton
        reaction={REACTION.UPVOTE}
        startIcon={renderReactionStartIcon(REACTION.UPVOTE, reaction)}
        size={variant === 'comment' ? 'small' : 'default'}
        reactState={reaction}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleOnClickReactionButton(e, REACTION.UPVOTE)
        }
      >
        <Typography variant={variant === 'comment' ? 'subtitle1' : 'h6'}>
          1.2k
        </Typography>
      </StyledReactionButton>
      <StyledReactionButton
        reaction={REACTION.DOWNVOTE}
        startIcon={renderReactionStartIcon(REACTION.DOWNVOTE, reaction)}
        size={variant === 'comment' ? 'small' : 'default'}
        reactState={reaction}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleOnClickReactionButton(e, REACTION.DOWNVOTE)
        }
      >
        <Typography variant={variant === 'comment' ? 'subtitle1' : 'h6'}>
          1.2k
        </Typography>
      </StyledReactionButton>
      {variant === 'post' && (
        <StyledCommentsButton startIcon={<ChatBubbleOutlineIcon />}>
          <Typography variant="h6">1.2k</Typography>
        </StyledCommentsButton>
      )}
    </StyledReactionBar>
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
      console.log(`Cannot find reaction ${reaction}`);
      return null;
  }
}

export default ReactionBar;
