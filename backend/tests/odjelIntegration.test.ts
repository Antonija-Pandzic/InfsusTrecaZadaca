/// <reference types="jest" />

import request from "supertest";
import app from "../src/app";
import { pool } from "../src/database/db";

describe("Integracijski test za Odjel API", () => {
  afterAll(async () => {
    await pool.end();
  });

  test("GET /odjeli vraća listu odjela", async () => {
    const response = await request(app).get("/odjeli");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});