import { Request, Response } from "express";
import {getUserWorkspaces} from '../services/workspaces.service';


export const getWorkspaces = async(req: Request, res:Response) => {
    try{

        const userId = req.user?.userId;
        const workspaces = await getUserWorkspaces(userId);

        return res.status(200).json({
            success: true,
            data: workspaces,
          });
    } catch (error: any) {
        res.status(400).json({
          message: error.message,
        });
      }
};
export const createWorkspace = () => {};
export const getWorkspaceDetails = () => {};
export const updateWorkspaceDetails = () => {};
export const deleteWorkspace = () => {};
export const inviteUserToWorkspace = () => {};
export const updateWorkspaceMember = () => {};
export const deleteWorkspaceMember = () =>{};