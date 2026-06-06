import prisma from "../prisma/prisma";

export const createBoard = async(
    title:string,
    workspaceId:string,
    description:string,
    coverColor:string) => await prisma.board.create({
    data: {
      title,
      description,
      coverColor,
      workspaceId,
    },
  });

export const getAllBoards = async (workspaceId: string) => await prisma.board.findMany({
    where: { workspaceId },
    orderBy: { createdAt: 'asc' }
  });