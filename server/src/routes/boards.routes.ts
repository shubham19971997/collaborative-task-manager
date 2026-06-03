import { Router } from "express";
import { getBoards, deleteBoard } from "../controllers/boards.controller";

const router = Router();

router.post("/:id", getBoards);
router.delete("/:id",deleteBoard);

export default router;