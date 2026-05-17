import { Router } from "express";
import { OdjelController } from "../controllers/OdjelController";

const router = Router();
const odjelController = new OdjelController();

router.get("/", odjelController.dohvatiSve);
router.get("/pretraga", odjelController.pretrazi);
router.get("/:id", odjelController.dohvatiPoId);
router.post("/", odjelController.dodaj);
router.put("/:id", odjelController.azuriraj);
router.delete("/:id", odjelController.obrisi);

export default router;