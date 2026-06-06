import { Request, Response } from "express";
import * as boardService from "../services/boards.service";


export const getBoards = async(req:Request, res:Response)=>{
    try{

      const workspaceId = req.params.id;

      if (!workspaceId || typeof workspaceId !== 'string') {
        return res.status(400).json({ error: "workspaceId query parameter is required." });
      }

      const boards = await boardService?.getAllBoards(workspaceId)

      res.json({
        data:    boards,
        message: "Fetched all of boards successfully",
      });
    
      } catch (error: any) {
        res.status(400).json({
          message: error.message,
        });
      }
};

export const createBoard = async(req:Request, res:Response)=>{
    try{

      const {title, workspaceId, description, coverColor} = req.body;

      if (typeof title !== "string" || typeof workspaceId !== "string" || typeof description !== "string" || typeof coverColor !== "string") {
        throw new Error("All fields must be string");
      }

      if (!title || !workspaceId) {
        return res.status(400).json({ error: "Title and workspaceId are required." });
      }

      const newBoard = await boardService?.createNewBoard(title, workspaceId, description, coverColor)

      res.json({
        data:    newBoard,
        message: "Created new board successfully",
      });
    
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
};

export const getBoardDetail = async(req:Request, res:Response)=>{
  try{

    const boardId = req.params.id;

    if (!boardId || typeof boardId !== 'string') {
      return res.status(400).json({ error: "boardId query parameter is required." });
    }

    const boardData = await boardService?.boardDetail(boardId);

    res.json({
      data:    boardData,
      message: "Fetched all of boards successfully",
    });
  
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateBoard = (req:Request, res:Response)=>{
  try{

    const boardId = req.params.id;

    const {title, description, coverColor} = req.body;

    if (!boardId || typeof boardId !== 'string') {
      return res.status(400).json({ error: "boardId query parameter is required." });
    }

    const updatedBoard = boardService?.updateBoardData(boardId, {title, description, coverColor});

    res.json({
      data:    updatedBoard,
      message: "Board data updated successfully",
    });
  
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteBoard = async(req:Request, res:Response)=>{
  try{
    const boardId = req.params.id;

    if (!boardId || typeof boardId !== 'string') {
      return res.status(400).json({ error: "boardId query parameter is required." });
    }

    await boardService?.deleteBoard(boardId);
    
    res.json({
      message: "Board delted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};