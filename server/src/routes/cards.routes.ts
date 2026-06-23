import { Router } from "express";
import { 
  createCard, 
  getCard, 
  updateCard, 
  deleteCard,
  addLabel,
  removeLabel
} from "../controllers/cards.controller";

const router = Router();

router.post("/", createCard);
router.get("/:id", getCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);
router.post("/:id/labels", addLabel);
router.delete("/:id/labels/:labelId", removeLabel);

export default router;