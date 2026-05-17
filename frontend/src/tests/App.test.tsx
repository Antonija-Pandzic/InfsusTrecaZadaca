/// <reference types="vitest" />
import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import App from "../App";
import { describe, test, expect, vi } from "vitest";


vi.mock("../api/odjelApi", () => ({
  getOdjeli: vi.fn().mockResolvedValue([]),
  pretraziOdjele: vi.fn().mockResolvedValue([]),
  createOdjel: vi.fn(),
  updateOdjel: vi.fn(),
  deleteOdjel: vi.fn(),
}));

vi.mock("../api/sobaApi", () => ({
  getSobeZaOdjel: vi.fn().mockResolvedValue([]),
  createSoba: vi.fn(),
  updateSoba: vi.fn(),
  deleteSoba: vi.fn(),
}));

vi.mock("../api/tipSobeApi", () => ({
  getTipoviSoba: vi.fn().mockResolvedValue([]),
}));

vi.mock("../api/tipOdjelaApi", () => ({
  getTipoviOdjela: vi.fn().mockResolvedValue([]),
  createTipOdjela: vi.fn(),
  updateTipOdjela: vi.fn(),
  deleteTipOdjela: vi.fn(),
}));

describe("App komponenta", () => {
  test("prikazuje naslov sustava", () => {
    render(<App />);

    expect(
      screen.getByText(/Sustav za upravljanje hospitalizacijom pacijenata/i)
    ).toBeInTheDocument();
  });
});