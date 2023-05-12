import { User } from '@prisma/client';
import prisma from '../addons/prismaClient.js';

interface ICreateProps {
  username: string;
  email: string;
  hashedPassword: string;
}
async function create(props: ICreateProps) {
  const { username, email, hashedPassword } = props;
  const user: User = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return user;
}

interface IReadProps {
  email?: string;
  username?: string;
}
async function read(props: IReadProps) {
  const existedUser = await prisma.user.findUnique({
    where: props,
  });
  return existedUser;
}

function update() {}
function remove() {}

const UserData = { create, read, update, remove };

export default UserData;
