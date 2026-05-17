import { OdjelRepository } from "../repositories/OdjelRepository";
import { Odjel } from "../models/Odjel";

export class OdjelService {
  private odjelRepository: OdjelRepository;

  constructor() {
    this.odjelRepository = new OdjelRepository();
  }

  async dohvatiSve(): Promise<Odjel[]> {
    return this.odjelRepository.dohvatiSve();
  }

  async dohvatiPoId(id: number): Promise<Odjel | null> {
    if (isNaN(id) || id <= 0) {
      throw new Error("Neispravan ID odjela.");
    }

    return this.odjelRepository.dohvatiPoId(id);
  }

  async pretraziPoNazivu(naziv: string): Promise<Odjel[]> {
    return this.odjelRepository.pretraziPoNazivu(naziv);
  }

  async dodaj(
    naziv: string,
    opis: string | undefined,
    tip_odjela_id: number
  ): Promise<Odjel> {
    this.provjeriNaziv(naziv);
    this.provjeriTipOdjela(tip_odjela_id);

    return this.odjelRepository.dodaj(naziv, opis, tip_odjela_id);
  }

  async azuriraj(
    id: number,
    naziv: string,
    opis: string | undefined,
    tip_odjela_id: number
  ): Promise<Odjel | null> {
    if (isNaN(id) || id <= 0) {
      throw new Error("Neispravan ID odjela.");
    }

    this.provjeriNaziv(naziv);
    this.provjeriTipOdjela(tip_odjela_id);

    return this.odjelRepository.azuriraj(id, naziv, opis, tip_odjela_id);
  }

  async obrisi(id: number): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("Neispravan ID odjela.");
    }

    return this.odjelRepository.obrisi(id);
  }

  private provjeriNaziv(naziv: string): void {
    if (!naziv || naziv.trim().length < 3) {
      throw new Error("Naziv odjela mora imati najmanje 3 znaka.");
    }
  }

  private provjeriTipOdjela(tip_odjela_id: number): void {
    if (!tip_odjela_id || isNaN(tip_odjela_id) || tip_odjela_id <= 0) {
      throw new Error("Tip odjela je obavezan.");
    }
  }
}