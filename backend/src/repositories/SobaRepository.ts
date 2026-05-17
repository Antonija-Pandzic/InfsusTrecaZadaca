import { pool } from "../database/db";
import { Soba } from "../models/Soba";

export class SobaRepository {
  async dohvatiSve(): Promise<Soba[]> {
    const result = await pool.query(`
      SELECT 
        s.soba_id,
        s.broj_sobe,
        s.kapacitet,
        s.odjel_id,
        s.tip_sobe_id,
        ts.naziv AS tip_sobe
      FROM soba s
      JOIN tip_sobe ts ON s.tip_sobe_id = ts.tip_sobe_id
      ORDER BY s.soba_id
    `);

    return result.rows;
  }

  async dohvatiPoOdjelu(odjelId: number): Promise<Soba[]> {
    const result = await pool.query(
      `
      SELECT 
        s.soba_id,
        s.broj_sobe,
        s.kapacitet,
        s.odjel_id,
        s.tip_sobe_id,
        ts.naziv AS tip_sobe
      FROM soba s
      JOIN tip_sobe ts ON s.tip_sobe_id = ts.tip_sobe_id
      WHERE s.odjel_id = $1
      ORDER BY s.broj_sobe
      `,
      [odjelId]
    );

    return result.rows;
  }

  async dohvatiPoId(id: number): Promise<Soba | null> {
    const result = await pool.query(
      `
      SELECT 
        s.soba_id,
        s.broj_sobe,
        s.kapacitet,
        s.odjel_id,
        s.tip_sobe_id,
        ts.naziv AS tip_sobe
      FROM soba s
      JOIN tip_sobe ts ON s.tip_sobe_id = ts.tip_sobe_id
      WHERE s.soba_id = $1
      `,
      [id]
    );

    return result.rows[0] || null;
  }

  async dodaj(
    brojSobe: string,
    kapacitet: number,
    odjelId: number,
    tipSobeId: number
  ): Promise<Soba> {
    const result = await pool.query(
      `
      INSERT INTO soba (broj_sobe, kapacitet, odjel_id, tip_sobe_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [brojSobe, kapacitet, odjelId, tipSobeId]
    );

    return result.rows[0];
  }

  async azuriraj(
    id: number,
    brojSobe: string,
    kapacitet: number,
    odjelId: number,
    tipSobeId: number
  ): Promise<Soba | null> {
    const result = await pool.query(
      `
      UPDATE soba
      SET broj_sobe = $1,
          kapacitet = $2,
          odjel_id = $3,
          tip_sobe_id = $4
      WHERE soba_id = $5
      RETURNING *
      `,
      [brojSobe, kapacitet, odjelId, tipSobeId, id]
    );

    return result.rows[0] || null;
  }

  async obrisi(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM soba WHERE soba_id = $1",
      [id]
    );

    return (result.rowCount ?? 0) > 0;
  }
}