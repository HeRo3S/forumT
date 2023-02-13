import instance from '.';

async function ExampleAPI() {
  const res = await instance.get('/g/following');
  return res.data;
}

const HomeService = {
  ExampleAPI,
};

export default HomeService;
