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

const SearchService = { SearchGroups };

export default SearchService;
