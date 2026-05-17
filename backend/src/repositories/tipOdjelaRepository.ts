import { pool } from "../database/db";

export const getAllTipoviOdjela = async () => {
  const result = await pool.query(
    "SELECT * FROM TIP_ODJELA ORDER BY tip_odjela_id"
  );

  return result.rows;
};

export const createTipOdjela = async (
  naziv: string,
  opis: string
) => {
  const result = await pool.query(
    `INSERT INTO TIP_ODJELA (naziv, opis)
     VALUES ($1, $2)
     RETURNING *`,
    [naziv, opis]
  );

  return result.rows[0];
};

export const updateTipOdjela = async (
  id: number,
  naziv: string,
  opis: string
) => {
  const result = await pool.query(
    `UPDATE TIP_ODJELA
     SET naziv = $1, opis = $2
     WHERE tip_odjela_id = $3
     RETURNING *`,
    [naziv, opis, id]
  );

  return result.rows[0];
};

export const deleteTipOdjela = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM TIP_ODJELA
     WHERE tip_odjela_id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};