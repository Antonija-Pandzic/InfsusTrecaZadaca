import { Router } from "express";

import {
  getTipoviOdjela,
  createTipOdjela,
  updateTipOdjela,
  deleteTipOdjela,
} from "../controllers/tipOdjelaController";

const router = Router();

router.get("/", getTipoviOdjela);
router.post("/", createTipOdjela);
router.put("/:id", updateTipOdjela);
router.delete("/:id", deleteTipOdjela);

export default router;