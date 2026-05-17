import { Request, Response } from "express";

import {
  dohvatiSveTipoveOdjela,
  dodajTipOdjela,
  urediTipOdjela,
  obrisiTipOdjela,
} from "../services/tipOdjelaService";

export const getTipoviOdjela = async (req: Request, res: Response) => {
  try {
    const tipoviOdjela = await dohvatiSveTipoveOdjela();
    res.status(200).json(tipoviOdjela);
  } catch (error: any) {
    res.status(500).json({
      message: "Greška kod dohvaćanja tipova odjela.",
      error: error.message,
    });
  }
};

export const createTipOdjela = async (req: Request, res: Response) => {
  try {
    const { naziv, opis } = req.body;

    const noviTipOdjela = await dodajTipOdjela(naziv, opis);

    res.status(201).json(noviTipOdjela);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateTipOdjela = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { naziv, opis } = req.body;

    const azuriraniTipOdjela = await urediTipOdjela(id, naziv, opis);

    res.status(200).json(azuriraniTipOdjela);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteTipOdjela = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const obrisaniTipOdjela = await obrisiTipOdjela(id);

    res.status(200).json(obrisaniTipOdjela);
  } catch (error: any) {
    if (
      error.code === "23503" ||
      error.message?.includes("violates foreign key constraint") ||
      error.message?.includes("violates RESTRICT setting")
    ) {
      return res.status(400).json({
        message:
          "Tip odjela se ne može obrisati jer se koristi u postojećim odjelima.",
      });
    }

    res.status(500).json({
      message: "Greška kod brisanja tipa odjela.",
    });
  }
};