import { Router } from "express";
import {
  getColumn,
  createColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/columns.controller";

const router = Router();

router.get("/", getColumn);
router.post("/", createColumn);
router.put("/:id", updateColumn);
router.delete("/:id", deleteColumn);

export default router;
