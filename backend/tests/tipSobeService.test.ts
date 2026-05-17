/// <reference types="jest" /> 

/*Ovo nam je test za poslovni sloj.*/

import {
  dodajTipSobe,
  urediTipSobe,
} from "../src/services/tipSobeService";

import * as repository from "../src/repositories/tipSobeRepository";

jest.mock("../src/repositories/tipSobeRepository");

describe("tipSobeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("ne dopušta dodavanje tipa sobe bez naziva", async () => {
    await expect(dodajTipSobe("", "Opis")).rejects.toThrow(
      "Naziv tipa sobe je obavezan."
    );
  });

  test("ne dopušta dodavanje tipa sobe s nazivom kraćim od 3 znaka", async () => {
    await expect(dodajTipSobe("AB", "Opis")).rejects.toThrow(
      "Naziv tipa sobe mora imati barem 3 znaka."
    );
  });

  test("dodaje tip sobe kada su podaci ispravni", async () => {
    (repository.createTipSobe as jest.Mock).mockResolvedValue({
      tip_sobe_id: 1,
      naziv: "VIP soba",
      opis: "Posebna soba",
    });

    const rezultat = await dodajTipSobe(" VIP soba ", " Posebna soba ");

    expect(repository.createTipSobe).toHaveBeenCalledWith(
      "VIP soba",
      "Posebna soba"
    );

    expect(rezultat.naziv).toBe("VIP soba");
  });

  test("ne dopušta uređivanje ako tip sobe ne postoji", async () => {
    (repository.updateTipSobe as jest.Mock).mockResolvedValue(null);

    await expect(
      urediTipSobe(999, "Standardna", "Opis")
    ).rejects.toThrow("Tip sobe nije pronađen.");
  });
});