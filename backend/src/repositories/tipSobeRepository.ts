import { pool } from "../database/db";

export const getAllTipoviSoba = async () => {
  const result = await pool.query(
    "SELECT * FROM TIP_SOBE ORDER BY tip_sobe_id"
  );

  return result.rows;
};

export const createTipSobe = async (
  naziv: string,
  opis: string
) => {
  const result = await pool.query(
    `INSERT INTO TIP_SOBE (naziv, opis)
     VALUES ($1, $2)
     RETURNING *`,
    [naziv, opis]
  );

  return result.rows[0];
};

export const updateTipSobe = async (
  id: number,
  naziv: string,
  opis: string
) => {
  const result = await pool.query(
    `UPDATE TIP_SOBE
     SET naziv = $1, opis = $2
     WHERE tip_sobe_id = $3
     RETURNING *`,
    [naziv, opis, id]
  );

  return result.rows[0];
};

export const deleteTipSobe = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM TIP_SOBE
     WHERE tip_sobe_id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};