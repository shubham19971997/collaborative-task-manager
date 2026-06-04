import { Request, Response } from "express";

export const getBoards = (req:Request, res:Response)=>{
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