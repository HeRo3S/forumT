import Post from '../components/post/Post';

function Home() {
  return (
    <div>
      <Post type="DEFAULT" />
      <Post type="MEDIA" />
      <Post type="LINK" />
    </div>
  );
}

export default Home;
