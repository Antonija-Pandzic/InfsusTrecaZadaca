import axios from "axios";

const API_URL = "http://localhost:3000/odjeli";

export const getOdjeli = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const pretraziOdjele = async (naziv: string) => {
  const response = await axios.get(`${API_URL}/pretraga?naziv=${naziv}`);
  return response.data;
};

export const createOdjel = async (
  naziv: string,
  opis: string,
  tip_odjela_id: number
) => {
  const response = await axios.post(API_URL, {
    naziv,
    opis,
    tip_odjela_id,
  });

  return response.data;
};

export const updateOdjel = async (
  id: number,
  naziv: string,
  opis: string,
  tip_odjela_id: number
) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    naziv,
    opis,
    tip_odjela_id,
  });

  return response.data;
};

export const deleteOdjel = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};