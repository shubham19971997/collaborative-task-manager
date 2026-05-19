import { Router } from "express";
import {getWorkspaces, createWorkspace, getWorkspaceDetails, updateWorkspaceDetails, deleteWorkspace, inviteUserToWorkspace, updateWorkspaceMember, deleteWorkspaceMember} from '../controllers/workspaces.controller'
const router = Router();

router.post("/", createWorkspace);
router.get("/", getWorkspaces);
router.get("/:id", getWorkspaceDetails);
router.patch("/:id", updateWorkspaceDetails);
router.delete(":id", deleteWorkspace);
router.post("/:id/invite", inviteUserToWorkspace);
router.post("/:id/members/:userId", updateWorkspaceMember);
router.delete("/:id/members/:userId", deleteWorkspaceMember);


export default router;
