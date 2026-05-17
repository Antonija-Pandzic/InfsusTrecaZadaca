import { Request, Response } from "express";

import {
  dohvatiSveTipoveSoba,
  dodajTipSobe,
  urediTipSobe,
  obrisiTipSobe,
} from "../services/tipSobeService";

export const getTipoviSoba = async (req: Request, res: Response) => {
  try {
    const tipoviSoba = await dohvatiSveTipoveSoba();
    res.status(200).json(tipoviSoba);
  } catch (error: any) {
    console.error("GREŠKA:", error);

    res.status(500).json({
      message: "Greška kod dohvaćanja tipova soba.",
      error: error.message,
    });
  }
};

export const createTipSobe = async (
  req: Request,
  res: Response
) => {
  try {
    const { naziv, opis } = req.body;

    const noviTipSobe = await dodajTipSobe(naziv, opis);

    res.status(201).json(noviTipSobe);
  } catch (error: any) {
  console.error(error);

  res.status(500).json({
    message: "Greška kod dohvaćanja tipova soba.",
    error: error.message,
  });
  }
};

export const updateTipSobe = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const { naziv, opis } = req.body;

    const azuriraniTipSobe = await urediTipSobe(
      id,
      naziv,
      opis
    );

    res.status(200).json(azuriraniTipSobe);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteTipSobe = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const obrisaniTipSobe = await obrisiTipSobe(id);

    res.status(200).json(obrisaniTipSobe);

  } catch (error: any) {
  if (
    error.code === "23503" ||
    error.message?.includes("violates foreign key constraint") ||
    error.message?.includes("violates RESTRICT setting")
  ) {
    return res.status(400).json({
      message:
        "Tip sobe se ne može obrisati jer se koristi u postojećim sobama.",
    });
  }

  return res.status(500).json({
    message: "Greška kod brisanja tipa sobe.",
  });
}
};