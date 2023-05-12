import GroupData from '../data/group.data.js';

async function SearchGroups(keyword: string) {
  const matchingGroups = await GroupData.readContainKeyword({ keyword });
  return matchingGroups;
}

async function SearchExactGroup(keyword: string) {
  const matching = GroupData.read({ keyword });
  return matching;
}

const SearchService = { SearchGroups, SearchExactGroup };

export default SearchService;
