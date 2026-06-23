import { Request, Response } from "express";
import * as columnServices from "../services/columns.service";
import { string } from "zod";

export const getColumn = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.body;

    if (!boardId || typeof boardId !== "string") {
      return res
        .status(400)
        .json({ error: "boardId query parameter is required." });
    }

    const columns = await columnServices.getColumnsByBoardId(boardId);

    res.json({
      data: columns,
      message: "Fetched all of columns successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getColumnByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "boardId query parameter is required." });
    }

    const column = await columnServices.getColumnById(id);

    res.json({
      data: column,
      message: "Fetched all of columns successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const createColumn = async (req: Request, res: Response) => {
  try {
    const { title, boardId, position } = req.body;

    if (!title || !boardId || position === undefined) {
      return res.status(400).json({
        error: "title, boardId, and position are required.",
      });
    }

    const newColumn = await columnServices.createColumn(
      title,
      boardId,
      position
    );

    res.json({
      data: newColumn,
      message: "Created new column successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateColumn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, position } = req.body;

    if (id !== "string") {
      return res.status(400).json({
        error: "title, boardId, and position are required.",
      });
    }

    const updatedColumn = await columnServices.updateColumnById(
      id,
      title,
      position
    );

    res.status(200).json({
      data: updatedColumn,
      message: "Updated the column successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteColumn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id !== "string") {
      return res.status(400).json({
        error: "title, boardId, and position are required.",
      });
    }
    await columnServices.deleteColumnById(id);

    res.json({
      message: "Deleted the column successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
