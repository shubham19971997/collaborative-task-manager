import { Request, Response } from "express";
import * as columnServices from "../services/columns.service";

export const getColumn = async (req: Request, res: Response) => {
  try {
    res.json({
      data: {},
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
    res.json({
      data: {},
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
    res.json({
      data: {},
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
    res.json({
      data: {},
      message: "Deleted the column successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
