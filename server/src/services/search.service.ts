import prisma from '../addons/prismaClient.js';

async function SearchGroups(keyword: string) {
  const matchingGroups = await prisma.group.findMany({
    where: {
      groupname: {
        contains: keyword,
      },
    },
    select: {
      id: true,
      groupname: true,
      displayname: true,
      avatarURL: true,
    },
    take: 5,
  });
  return matchingGroups;
}

async function SearchExactGroup(keyword: string) {
  const matching = await prisma.group.findUnique({
    where: {
      groupname: keyword,
    },
  });
  return matching;
}

const SearchService = { SearchGroups, SearchExactGroup };

export default SearchService;
