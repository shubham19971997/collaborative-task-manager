import prisma from "../prisma/prisma";

export const getColumnsByBoardId = async (boardId: string) => {
  return await prisma.column.findMany({
    where: { boardId },
    orderBy: { position: "asc" }, // Essential for drag-and-drop UI
    include: {
      cards: {
        orderBy: { position: "asc" }, // Keep the cards sorted too!
      },
    },
  });
};

export const getColumnById = async (columnId: string) => {
  return await prisma.column.findUnique({
    where: { id: columnId },
    include: {
      cards: {
        orderBy: { position: "asc" },
      },
    },
  });
};

export const createColumn = async (title: string, boardId:string, position:number) => await prisma.column.create({
  data: {
    title: title,
    boardId: boardId,
    position: position,
  }
});

export const updateColumn = async (title: string, boardId:string, position:number) => await prisma.column.update({
  where: {id: boardId},
  data:{
    ...(title !== undefined && { title: title }),
      ...(position !== undefined && { position: position }),
  }
})

export const deleteColumn = async(id:string) => await prisma.column.delete({
  where: {id: id},
})
