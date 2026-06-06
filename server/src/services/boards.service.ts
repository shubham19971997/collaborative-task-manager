import * as boardRepository from '../repositories/boardRepository';
import { findWorkspace } from '../repositories/workspaceRepository';

export const getAllBoards = async(workspaceId:string) =>{

     const workspace = await findWorkspace(workspaceId);
     if(!workspace) {
          throw new Error(`Workspace with this id "${workspaceId}" does not exist`);
     }

     const boards = await boardRepository?.getAllBoards(workspaceId)
     if(!boards){
          throw new Error(`Internal server error`)  
     }

     return boards;
}

export const createNewBoard = async(
     title:string,
     workspaceId:string,
     description:string,
     coverColor:string) =>{

     const workspace = await findWorkspace(workspaceId);
     if(!workspace) {
          throw new Error(`Workspace with this id "${workspaceId}" does not exist`);
     }
      
     const newBoard = await boardRepository?.createBoard(title, workspaceId, description, coverColor )
     if(!newBoard){
          throw new Error(`Internal server error`)  
     }

     return newBoard;
     
}