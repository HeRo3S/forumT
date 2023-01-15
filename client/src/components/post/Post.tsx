import MessageIcon from '@mui/icons-material/Message';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import './post.css';

function Post() {
  return (
    <div
      className="mainContainer"
      style={{
        display: 'flex',
      }}
    >
      <div className="reactionBar">
        <IconButton>
          <ThumbUpIcon />
          <span>1.2k</span>
        </IconButton>
        <IconButton>
          <ThumbDownIcon />
          <span>1.2k</span>
        </IconButton>
        <IconButton>
          <MessageIcon />
          <span>1.2k</span>
        </IconButton>
      </div>
      <div className="contentBar" style={{ flex: 'auto' }} />
    </div>
  );
}

export default Post;
