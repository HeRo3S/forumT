import MessageIcon from '@mui/icons-material/Message';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import './post.css';

function Post() {
  return (
    <Container className="postContainer mainContainer">
      <Grid2 xs={3} className="reactionBar">
        <button type="button" className="reactionButton">
          <ThumbUpIcon />
          <Typography variant="h6">1.2k</Typography>
        </button>
        <button type="button" className="reactionButton">
          <ThumbDownIcon />
          <Typography variant="h6">1.2k</Typography>
        </button>
        <button type="button" className="reactionButton">
          <MessageIcon />
          <Typography variant="h6">1.2k</Typography>
        </button>
      </Grid2>
      <Grid2 xs container className="contentBar">
        <Grid2 xs={12} display="flex" sx={{ marginTop: '10px' }}>
          <Typography variant="subtitle1" className="boldText">
            g/gaming
          </Typography>
          <Typography
            variant="subtitle1"
            className="grayText"
            sx={{ marginLeft: '20px' }}
          >
            Đăng bởi u/hung123
          </Typography>
        </Grid2>
        <Grid2 xs={12}>
          <Typography variant="h4" className="boldText">
            Đâu là tựa game tệ nhất 2022?
          </Typography>
        </Grid2>
        <Grid2 xs={12} display="flex">
          <button type="button">
            <Typography variant="subtitle2" className="grayText">
              Báo cáo vi phạm
            </Typography>
          </button>
          <button type="button">
            <Typography variant="subtitle2" className="grayText">
              Xoá bài viết
            </Typography>
          </button>
          <button type="button">
            <Typography variant="subtitle2" className="grayText">
              Admin quản lý
            </Typography>
          </button>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Post;
