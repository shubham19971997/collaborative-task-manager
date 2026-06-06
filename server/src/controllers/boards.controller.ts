import { Request, Response } from "express";
import * as boardService from "../services/boards.service";


export const getBoards = async(req:Request, res:Response)=>{
    try{

      const {workspaceId} = req.params;

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

export const getBoardDetail = (req:Request, res:Response)=>{
  try{

  
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateBoard = (req:Request, res:Response)=>{
  try{

  
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteBoard = (req:Request, res:Response)=>{
  try{

  
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};