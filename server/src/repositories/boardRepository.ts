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

export const getAllBoards = async(workspaceId: string) => await prisma.board.findMany({
    where: { workspaceId },
    orderBy: { createdAt: 'asc' }
  });

export const boardDetail = async(boardId:string) => await prisma.board.findUnique({
    where: { id: boardId },
    include: {
      columns: {
        orderBy: { position: 'asc' },
        include: {
          cards: {
            orderBy: { position: 'asc' },
            include: { labels: true }
          }
        }
      }
    }
  });

export const updateBoard = async(boardId:string, data:any) =>await prisma.board.update({
    where: { id: boardId },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.coverColor !== undefined && { coverColor: data.coverColor }),
    },
});

export const deleteBoard = async(boardId:string) => await prisma.board.delete({
    where: { id: boardId }
  });