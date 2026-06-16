import * as columnRepository from "../repositories/columnRepository";

export const getColumnsByBoardId = async (boardId: string) => {
  const columns = columnRepository.getColumnsByBoardId(boardId);
  return columns;
};

export const getColumnById = async (id: string) => {
  const column = columnRepository.getColumnById(id);
  return column;
};
