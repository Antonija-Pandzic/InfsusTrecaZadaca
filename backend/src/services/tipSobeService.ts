import {
  getAllTipoviSoba,
  createTipSobe,
  updateTipSobe,
  deleteTipSobe,
} from "../repositories/tipSobeRepository";

export const dohvatiSveTipoveSoba = async () => {
  return await getAllTipoviSoba();
};

export const dodajTipSobe = async (naziv: string, opis: string) => {
  if (!naziv || naziv.trim() === "") {
    throw new Error("Naziv tipa sobe je obavezan.");
  }

  if (naziv.trim().length < 3) {
    throw new Error("Naziv tipa sobe mora imati barem 3 znaka.");
  }

  return await createTipSobe(naziv.trim(), opis?.trim() || "");
};

export const urediTipSobe = async (
  id: number,
  naziv: string,
  opis: string
) => {
  if (!naziv || naziv.trim() === "") {
    throw new Error("Naziv tipa sobe je obavezan.");
  }

  if (naziv.trim().length < 3) {
    throw new Error("Naziv tipa sobe mora imati barem 3 znaka.");
  }

  const azuriraniTipSobe = await updateTipSobe(
    id,
    naziv.trim(),
    opis?.trim() || ""
  );

  if (!azuriraniTipSobe) {
    throw new Error("Tip sobe nije pronađen.");
  }

  return azuriraniTipSobe;
};

export const obrisiTipSobe = async (id: number) => {
  const obrisaniTipSobe = await deleteTipSobe(id);

  if (!obrisaniTipSobe) {
    throw new Error("Tip sobe nije pronađen.");
  }

  return obrisaniTipSobe;
};