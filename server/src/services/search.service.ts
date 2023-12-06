import GroupData from '../data/group.data.js';
import PostData from '../data/post.data.js';

async function SearchGroups(keyword: string) {
  const matchingGroups = await GroupData.readContainKeyword({ keyword });
  return matchingGroups;
}

async function SearchExactGroup(keyword: string) {
  const matching = await GroupData.read({ groupname: keyword });
  return matching;
}

async function SearchPosts(keyword: string) {
  const matchingPosts = await PostData.readContainKeyword({ keyword });
  return matchingPosts;
}

const SearchService = { SearchGroups, SearchExactGroup, SearchPosts };

export default SearchService;
