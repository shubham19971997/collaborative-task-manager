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
