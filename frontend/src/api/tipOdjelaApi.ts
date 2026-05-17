import axios from "axios";

const API_URL = "http://localhost:3000/api/tipovi-odjela";

export const getTipoviOdjela = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTipOdjela = async (
  naziv: string,
  opis: string
) => {
  const response = await axios.post(API_URL, {
    naziv,
    opis,
  });

  return response.data;
};

export const updateTipOdjela = async (
  id: number,
  naziv: string,
  opis: string
) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    naziv,
    opis,
  });

  return response.data;
};

export const deleteTipOdjela = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};