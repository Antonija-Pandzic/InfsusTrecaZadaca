import { Request, Response } from "express";
import { OdjelService } from "../services/OdjelService";

const odjelService = new OdjelService();

export class OdjelController {
  async dohvatiSve(req: Request, res: Response): Promise<void> {
    try {
        const odjeli = await odjelService.dohvatiSve();
        res.json(odjeli);
    } catch (error) {
        console.error("GREŠKA DOHVATI SVE ODJELI:", error);
        res.status(500).json({ 
        poruka: "Greška kod dohvaćanja odjela.",
        detalji: (error as Error).message
        });
    }
  }

  async dohvatiPoId(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const odjel = await odjelService.dohvatiPoId(id);

      if (!odjel) {
        res.status(404).json({ poruka: "Odjel nije pronađen." });
        return;
      }

      res.json(odjel);
    } catch (error) {
      res.status(400).json({ poruka: (error as Error).message });
    }
  }

  async pretrazi(req: Request, res: Response): Promise<void> {
    try {
      const naziv = String(req.query.naziv || "");
      const odjeli = await odjelService.pretraziPoNazivu(naziv);

      res.json(odjeli);
    } catch (error) {
      res.status(500).json({ poruka: "Greška kod pretraživanja odjela." });
    }
  }

async dodaj(req: Request, res: Response): Promise<void> {
  try {
    const { naziv, opis, tip_odjela_id } = req.body;

    const noviOdjel = await odjelService.dodaj(
      naziv,
      opis,
      tip_odjela_id
    );

    res.status(201).json(noviOdjel);
  } catch (error) {
    res.status(400).json({ poruka: (error as Error).message });
  }
}
 async azuriraj(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);

    const { naziv, opis, tip_odjela_id } = req.body;

    const odjel = await odjelService.azuriraj(
      id,
      naziv,
      opis,
      tip_odjela_id
    );

    if (!odjel) {
      res.status(404).json({ poruka: "Odjel nije pronađen." });
      return;
    }

    res.json(odjel);
  } catch (error) {
    res.status(400).json({ poruka: (error as Error).message });
  }
}

  async obrisi(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const obrisan = await odjelService.obrisi(id);

      if (!obrisan) {
        res.status(404).json({ poruka: "Odjel nije pronađen." });
        return;
      }

      res.json({ poruka: "Odjel je uspješno obrisan." });
    } catch (error) {
      res.status(400).json({ poruka: (error as Error).message });
    }
  }
}