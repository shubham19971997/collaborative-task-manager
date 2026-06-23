import { Request, Response } from "express";

export const getCard = async (req: Request, res: Response) => {
  try {
    const card = {};
    res.json({
      data: card,
      message: "Fetched all of boards successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = {};
    res.json({
      data: newCard,
      message: "Fetched all of boards successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = {};
    res.json({
      data: updateCard,
      message: "Fetched all of boards successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const deleteCard = {};
    res.json({
      data: deleteCard,
      message: "Fetched all of boards successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const addLabel = async (req: Request, res: Response) => {
  try {
    const newLabel = {};
    res.json({
      data: newLabel,
      message: "Fetched all of boards successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const removeLabel = async (req: Request, res: Response) => {
  try {
    const removedLabel = {};
    res.json({
      data: removedLabel,
      message: "Fetched all of boards successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
