/* Direktno komunicira s bazom za tablicu Odjel */

import { pool } from "../database/db";
import { Odjel } from "../models/Odjel";

export class OdjelRepository {
  async dohvatiSve(): Promise<Odjel[]> {
    const result = await pool.query(
      `SELECT 
         o.odjel_id,
         o.naziv,
         o.opis,
         o.tip_odjela_id,
         t.naziv AS tip_odjela
       FROM ODJEL o
       JOIN TIP_ODJELA t ON o.tip_odjela_id = t.tip_odjela_id
       ORDER BY o.odjel_id`
    );

    return result.rows;
  }

  async dohvatiPoId(id: number): Promise<Odjel | null> {
    const result = await pool.query(
      `SELECT 
         o.odjel_id,
         o.naziv,
         o.opis,
         o.tip_odjela_id,
         t.naziv AS tip_odjela
       FROM ODJEL o
       JOIN TIP_ODJELA t ON o.tip_odjela_id = t.tip_odjela_id
       WHERE o.odjel_id = $1`,
      [id]
    );

    return result.rows[0] || null;
  }

  async pretraziPoNazivu(naziv: string): Promise<Odjel[]> {
    const result = await pool.query(
      `SELECT 
         o.odjel_id,
         o.naziv,
         o.opis,
         o.tip_odjela_id,
         t.naziv AS tip_odjela
       FROM ODJEL o
       JOIN TIP_ODJELA t ON o.tip_odjela_id = t.tip_odjela_id
       WHERE LOWER(o.naziv) LIKE LOWER($1)
       ORDER BY o.odjel_id`,
      [`%${naziv}%`]
    );

    return result.rows;
  }

  async dodaj(
    naziv: string,
    opis: string | undefined,
    tip_odjela_id: number
  ): Promise<Odjel> {
    const result = await pool.query(
      `INSERT INTO ODJEL (naziv, opis, tip_odjela_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [naziv, opis || null, tip_odjela_id]
    );

    return result.rows[0];
  }

  async azuriraj(
    id: number,
    naziv: string,
    opis: string | undefined,
    tip_odjela_id: number
  ): Promise<Odjel | null> {
    const result = await pool.query(
      `UPDATE ODJEL
       SET naziv = $1,
           opis = $2,
           tip_odjela_id = $3
       WHERE odjel_id = $4
       RETURNING *`,
      [naziv, opis || null, tip_odjela_id, id]
    );

    return result.rows[0] || null;
  }

  async obrisi(id: number): Promise<boolean> {
    const result = await pool.query(
      "DELETE FROM ODJEL WHERE odjel_id = $1",
      [id]
    );

    return (result.rowCount ?? 0) > 0;
  }
}