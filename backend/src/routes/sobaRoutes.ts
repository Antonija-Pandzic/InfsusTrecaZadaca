import { Router } from "express";
import { SobaController } from "../controllers/SobaController";

const router = Router();
const sobaController = new SobaController();

router.get("/", sobaController.dohvatiSve);
router.get("/odjel/:odjelId", sobaController.dohvatiPoOdjelu);
router.get("/:id", sobaController.dohvatiPoId);
router.post("/", sobaController.dodaj);
router.put("/:id", sobaController.azuriraj);
router.delete("/:id", sobaController.obrisi);

export default router;