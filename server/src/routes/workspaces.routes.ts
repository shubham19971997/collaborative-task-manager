import { Router } from "express";
import {getWorkspaces, createWorkspace, getWorkspaceDetails, updateWorkspaceDetails, deleteWorkspace, inviteUserToWorkspace, updateWorkspaceMember, deleteWorkspaceMember} from '../controllers/workspaces.controller'
// const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

// router.use(authMiddleware);

router.get("/", getWorkspaces);
router.post("/", createWorkspace);
router.get("/:id", getWorkspaceDetails);
router.patch("/:id", updateWorkspaceDetails);
router.delete("/:id", deleteWorkspace);
router.post("/:id/invite", inviteUserToWorkspace);
router.patch("/:id/members/:userId", updateWorkspaceMember);
router.delete("/:id/members/:userId", deleteWorkspaceMember);


export default router;
