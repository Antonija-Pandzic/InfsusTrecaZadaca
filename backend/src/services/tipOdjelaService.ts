import {
  getAllTipoviOdjela,
  createTipOdjela,
  updateTipOdjela,
  deleteTipOdjela,
} from "../repositories/tipOdjelaRepository";

export const dohvatiSveTipoveOdjela = async () => {
  return await getAllTipoviOdjela();
};

export const dodajTipOdjela = async (naziv: string, opis: string) => {
  if (!naziv || naziv.trim() === "") {
    throw new Error("Naziv tipa odjela je obavezan.");
  }

  if (naziv.trim().length < 3) {
    throw new Error("Naziv tipa odjela mora imati barem 3 znaka.");
  }

  return await createTipOdjela(naziv.trim(), opis?.trim() || "");
};

export const urediTipOdjela = async (
  id: number,
  naziv: string,
  opis: string
) => {
  if (!naziv || naziv.trim() === "") {
    throw new Error("Naziv tipa odjela je obavezan.");
  }

  if (naziv.trim().length < 3) {
    throw new Error("Naziv tipa odjela mora imati barem 3 znaka.");
  }

  const azuriraniTipOdjela = await updateTipOdjela(
    id,
    naziv.trim(),
    opis?.trim() || ""
  );

  if (!azuriraniTipOdjela) {
    throw new Error("Tip odjela nije pronađen.");
  }

  return azuriraniTipOdjela;
};

export const obrisiTipOdjela = async (id: number) => {
  const obrisaniTipOdjela = await deleteTipOdjela(id);

  if (!obrisaniTipOdjela) {
    throw new Error("Tip odjela nije pronađen.");
  }

  return obrisaniTipOdjela;
};