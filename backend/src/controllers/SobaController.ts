import { Request, Response } from "express";
import { SobaService } from "../services/SobaService";

const sobaService = new SobaService();

export class SobaController {
  async dohvatiSve(req: Request, res: Response): Promise<void> {
    try {
      const sobe = await sobaService.dohvatiSve();
      res.json(sobe);
    } catch (error) {
      res.status(500).json({
        poruka: "Greška kod dohvaćanja soba.",
        detalji: (error as Error).message
      });
    }
  }

  async dohvatiPoOdjelu(req: Request, res: Response): Promise<void> {
    try {
      const odjelId = Number(req.params.odjelId);
      const sobe = await sobaService.dohvatiPoOdjelu(odjelId);

      res.json(sobe);
    } catch (error) {
      res.status(400).json({
        poruka: (error as Error).message
      });
    }
  }

  async dohvatiPoId(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const soba = await sobaService.dohvatiPoId(id);

      if (!soba) {
        res.status(404).json({ poruka: "Soba nije pronađena." });
        return;
      }

      res.json(soba);
    } catch (error) {
      res.status(400).json({
        poruka: (error as Error).message
      });
    }
  }

async dodaj(req: Request, res: Response): Promise<void> {
  try {
    const { broj_sobe, kapacitet, odjel_id, tip_sobe_id } = req.body;

    const novaSoba = await sobaService.dodaj(
      broj_sobe,
      kapacitet,
      odjel_id,
      tip_sobe_id
    );

    res.status(201).json(novaSoba);
  } catch (error: any) {
    if (
      error.code === "23505" ||
      error.message?.includes("duplicate key")
    ) {
      res.status(400).json({
        poruka: "Soba s tim brojem već postoji u odabranom odjelu.",
      });
      return;
    }

    res.status(400).json({
      poruka: error.message || "Greška kod dodavanja sobe.",
    });
  }
}

async azuriraj(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);

    const { broj_sobe, kapacitet, odjel_id, tip_sobe_id } = req.body;

    const soba = await sobaService.azuriraj(
      id,
      broj_sobe,
      kapacitet,
      odjel_id,
      tip_sobe_id
    );

    if (!soba) {
      res.status(404).json({ poruka: "Soba nije pronađena." });
      return;
    }

    res.json(soba);
  } catch (error: any) {
    if (
      error.code === "23505" ||
      error.message?.includes("duplicate key")
    ) {
      res.status(400).json({
        poruka: "Soba s tim brojem već postoji u odabranom odjelu.",
      });
      return;
    }

    res.status(400).json({
      poruka: error.message || "Greška kod ažuriranja sobe.",
    });
  }
}

  async obrisi(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      const obrisana = await sobaService.obrisi(id);

      if (!obrisana) {
        res.status(404).json({ poruka: "Soba nije pronađena." });
        return;
      }

      res.json({ poruka: "Soba je uspješno obrisana." });
    } catch (error) {
      res.status(400).json({
        poruka: (error as Error).message
      });
    }
  }
}