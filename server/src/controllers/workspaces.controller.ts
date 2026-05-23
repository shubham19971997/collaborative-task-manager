import { Request, Response } from "express";
import * as workspaceService from "../services/workspaces.service";


export const getWorkspaces = async(req: Request, res:Response) => {
    try{

        const userId = req.user?.userId;
        const workspaces = await workspaceService.getUserWorkspaces(userId);

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

export async function createWorkspace(req: Request, res: Response) {
  const workspace = await workspaceService.createWorkspace(
    req.user!.id,
    req.body
  );

  res.status(201).json({
    data:    workspace,
    message: "Workspace created successfully",
  });
}


export const getWorkspaceDetails = () => {};
export const updateWorkspaceDetails = () => {};
export const deleteWorkspace = () => {};
export const inviteUserToWorkspace = () => {};
export const updateWorkspaceMember = () => {};
export const deleteWorkspaceMember = () =>{};