/// <reference types="jest" />

import { OdjelService } from "../src/services/OdjelService";
import { OdjelRepository } from "../src/repositories/OdjelRepository";

jest.mock("../src/repositories/OdjelRepository");

describe("OdjelService", () => {
  let service: OdjelService;
  let mockRepository: jest.Mocked<OdjelRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRepository = {
      dohvatiSve: jest.fn(),
      dohvatiPoId: jest.fn(),
      pretraziPoNazivu: jest.fn(),
      dodaj: jest.fn(),
      azuriraj: jest.fn(),
      obrisi: jest.fn(),
    } as unknown as jest.Mocked<OdjelRepository>;

    (OdjelRepository as jest.Mock).mockImplementation(() => mockRepository);

    service = new OdjelService();
  });

  test("ne dopušta dodavanje odjela ako je naziv kraći od 3 znaka", async () => {
    await expect(service.dodaj("AB", "Opis", 1)).rejects.toThrow(
      "Naziv odjela mora imati najmanje 3 znaka."
    );
  });

  test("ne dopušta dodavanje odjela bez tipa odjela", async () => {
    await expect(service.dodaj("Kirurgija", "Opis", 0)).rejects.toThrow(
      "Tip odjela je obavezan."
    );
  });

  test("dodaje odjel kada su podaci ispravni", async () => {
    mockRepository.dodaj.mockResolvedValue({
      odjel_id: 1,
      naziv: "Kirurgija",
      opis: "Kirurški odjel",
      tip_odjela_id: 2,
      tip_odjela: "Kirurški",
    });

    const rezultat = await service.dodaj("Kirurgija", "Kirurški odjel", 2);

    expect(mockRepository.dodaj).toHaveBeenCalledWith(
      "Kirurgija",
      "Kirurški odjel",
      2
    );

    expect(rezultat.naziv).toBe("Kirurgija");
    expect(rezultat.tip_odjela_id).toBe(2);
  });

  test("ne dopušta ažuriranje odjela s neispravnim ID-em", async () => {
    await expect(
      service.azuriraj(0, "Kirurgija", "Opis", 2)
    ).rejects.toThrow("Neispravan ID odjela.");
  });
});