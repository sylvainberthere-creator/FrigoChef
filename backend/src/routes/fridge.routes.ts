import { Router } from "express";
import {
  addToFridge,
  removeFromFridge,
  getFridge,
} from "../controllers/fridge.controller";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.use(protect); // toutes les routes sont protégées

router.get("/", getFridge);
router.post("/add", addToFridge);
router.delete("/remove/:itemId", removeFromFridge);

export default router;
