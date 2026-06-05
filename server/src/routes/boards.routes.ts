import { Router } from "express";
import { getBoards, deleteBoard, createBoard, getBoardDetail, updateBoard  } from "../controllers/boards.controller";

const router = Router();

router.get("/:id/", getBoards)
router.post("/", createBoard);
router.get("/:id", getBoardDetail);
router.put("/:id", updateBoard);
router.delete("/:id",deleteBoard);

export default router;