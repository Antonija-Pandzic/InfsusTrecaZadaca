import { SobaRepository } from "../repositories/SobaRepository";
import { Soba } from "../models/Soba";

export class SobaService {
  private sobaRepository: SobaRepository;

  constructor() {
    this.sobaRepository = new SobaRepository();
  }

  async dohvatiSve(): Promise<Soba[]> {
    return this.sobaRepository.dohvatiSve();
  }

  async dohvatiPoOdjelu(odjelId: number): Promise<Soba[]> {
    this.provjeriId(odjelId, "Neispravan ID odjela.");

    return this.sobaRepository.dohvatiPoOdjelu(odjelId);
  }

  async dohvatiPoId(id: number): Promise<Soba | null> {
    this.provjeriId(id, "Neispravan ID sobe.");

    return this.sobaRepository.dohvatiPoId(id);
  }

  async dodaj(
    brojSobe: string,
    kapacitet: number,
    odjelId: number,
    tipSobeId: number
  ): Promise<Soba> {
    this.provjeriPodatke(brojSobe, kapacitet, odjelId, tipSobeId);

    return this.sobaRepository.dodaj(brojSobe, kapacitet, odjelId, tipSobeId);
  }

  async azuriraj(
    id: number,
    brojSobe: string,
    kapacitet: number,
    odjelId: number,
    tipSobeId: number
  ): Promise<Soba | null> {
    this.provjeriId(id, "Neispravan ID sobe.");
    this.provjeriPodatke(brojSobe, kapacitet, odjelId, tipSobeId);

    return this.sobaRepository.azuriraj(id, brojSobe, kapacitet, odjelId, tipSobeId);
  }

  async obrisi(id: number): Promise<boolean> {
    this.provjeriId(id, "Neispravan ID sobe.");

    return this.sobaRepository.obrisi(id);
  }

  private provjeriPodatke(
    brojSobe: string,
    kapacitet: number,
    odjelId: number,
    tipSobeId: number
  ): void {
    if (!brojSobe || brojSobe.trim().length === 0) {
      throw new Error("Broj sobe mora biti unesen.");
    }

    if (isNaN(kapacitet) || kapacitet < 1 || kapacitet > 8) {
      throw new Error("Kapacitet sobe mora biti između 1 i 8.");
    }

    this.provjeriId(odjelId, "Soba mora pripadati odjelu.");
    this.provjeriId(tipSobeId, "Tip sobe mora biti odabran.");
  }

  private provjeriId(id: number, poruka: string): void {
    if (isNaN(id) || id <= 0) {
      throw new Error(poruka);
    }
  }
}