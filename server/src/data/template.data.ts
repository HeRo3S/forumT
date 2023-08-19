import prisma from '../addons/prismaClient.js';

interface ICreateProps {}
async function create(props: ICreateProps) {}

interface IReadProps {}
async function read(props: IReadProps) {}

interface IReadManyProps {}
async function readMany(props: IReadManyProps) {}

async function update() {}
async function remove() {}

const Data = { create, read, readMany, update, remove };

export default Data;
