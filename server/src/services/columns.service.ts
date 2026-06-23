import * as columnRepository from "../repositories/columnRepository";

export const getColumnsByBoardId = async (boardId: string) => {
  const columns = columnRepository.getColumnsByBoardId(boardId);
  return columns;
};

export const getColumnById = async (id: string) => {
  const column = columnRepository.getColumnById(id);
  return column;
};

export const createColumn = async (
  title: string,
  boardId: string,
  position: number
) => {
  const column = await columnRepository.createColumn(title, boardId, position);
  return column;
};

export const updateColumnById = async (
  id: string,
  title: string,
  position: number
) => {
  const updatedColumn = await columnRepository.updateColumn(
    id,
    title,
    position
  );
  return updatedColumn;
};

export const deleteColumnById = async (id: string) => {
  const deleteColumn = await columnRepository.deleteColumn(id);
};
