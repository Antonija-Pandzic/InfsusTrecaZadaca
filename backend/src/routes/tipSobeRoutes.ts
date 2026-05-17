import { Router } from "express";

import {
  getTipoviSoba,
  createTipSobe,
  updateTipSobe,
  deleteTipSobe,
} from "../controllers/tipSobeController";

const router = Router();

router.get("/", getTipoviSoba);
router.post("/", createTipSobe);
router.put("/:id", updateTipSobe);
router.delete("/:id", deleteTipSobe);

export default router;