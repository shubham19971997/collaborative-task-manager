import { Request, Response } from "express";
import * as workspaceService from "../services/workspaces.service";

export const getWorkspaces = async(req: Request, res:Response) => {
    try{
        const userId = req.body.id;
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
  try{
    const workspace = await workspaceService.createWorkspace(
      req.body.user.id,
      req.body
    );

    res.status(201).json({
      data:    workspace,
      message: "Workspace created successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
}


export const getWorkspaceDetails = async(req: Request, res: Response) => {
  try{
    const workspaceId = req.params.id;

    if (typeof workspaceId !== "string") {
      throw new Error("workspaceId must be a string");
    }

    const workspaceDetails = await workspaceService.getWorkspaceDetails(workspaceId);

    return res.status(200).json({
        success: true,
        data: workspaceDetails,
      });
    
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateWorkspaceDetails = async(req: Request, res: Response) => {
  try{

    const workspaceId = req.params.id;
    const body = req.body;

    if (typeof workspaceId !== "string") {
      throw new Error("workspaceId must be a string");
    }
    const updatedWorkspace = await workspaceService.updateWorkspaceDetails(workspaceId, body)

    res.json({
      data:    updatedWorkspace,
      message: "Workspace updated successfully",
    });

  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteWorkspace = async(req: Request, res: Response) => {
  try{
    const workspaceId = req.params.id;

    if (typeof workspaceId !== "string") {
      throw new Error("workspaceId must be a string");
    }

    const workspaceDetails = await workspaceService.deleteWorkspace(workspaceId);

    return res.status(200).json({
        success: true,
        message: "Workspace deleted successfully",
        data: workspaceDetails,
      });
    
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const inviteUserToWorkspace = async(req: Request, res: Response) => {

  const workspaceId = req.params.id;

  if (typeof workspaceId !== "string") {
    throw new Error("workspaceId must be a string");
  }
  const member = await workspaceService.inviteMember(
    workspaceId,
    req.body
  );

  res.status(201).json({
    data:    member,
    message: `A new member has been added to the workspace`,
  });
}

export const updateWorkspaceMember = async(req: Request, res: Response) => {

  const workspaceId = req.params.id;
  const userId = req.params.userId;
  const body = req.body;

  if (typeof workspaceId !== "string" || typeof userId !== "string") {
    throw new Error("workspaceId and userId both must be a string");
  }

  const updatedMember = await workspaceService.updateWorkspaceMember(workspaceId, userId, body)

  res.status(201).json({
    data:    updatedMember,
    message: `Members of the workspace has been updated`,
  });
};

export const deleteWorkspaceMember = async(req: Request, res: Response) => {

  const workspaceId = req.params.id;
  const userId = req.params.userId;
  const body = req.body;

  if (typeof workspaceId !== "string" || typeof userId !== "string") {
    throw new Error("workspaceId and userId both must be a string");
  }

  const deletedMember = await workspaceService.removeWorkspaceMember(workspaceId, userId)

  res.status(201).json({
    message: `${deletedMember.name} has been removed from the workspace`,
  });
};