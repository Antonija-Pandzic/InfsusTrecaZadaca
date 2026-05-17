/* Model opisuje kako izgleda jedan odjel u app */

export interface Odjel {
  odjel_id: number;
  naziv: string;
  opis?: string;
  tip_odjela_id: number;
  tip_odjela?: string;
}