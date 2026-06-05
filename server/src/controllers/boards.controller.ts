import { Request, Response } from "express";

export const getBoards = (req:Request, res:Response)=>{
    try{

      const boards = {}

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

export const createBoard = (req:Request, res:Response)=>{
    try{

    
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