import axios from "axios";

const API_URL = "http://localhost:3000/sobe";

export const getSobeZaOdjel = async (odjelId: number) => {
  const response = await axios.get(`${API_URL}/odjel/${odjelId}`);
  return response.data;
};

export const createSoba = async (
  broj_sobe: string,
  kapacitet: number,
  odjel_id: number,
  tip_sobe_id: number
) => {
  const response = await axios.post(API_URL, {
    broj_sobe,
    kapacitet,
    odjel_id,
    tip_sobe_id,
  });

  return response.data;
};

export const updateSoba = async (
  id: number,
  broj_sobe: string,
  kapacitet: number,
  odjel_id: number,
  tip_sobe_id: number
) => {
  const response = await axios.put(`${API_URL}/${id}`, {
    broj_sobe,
    kapacitet,
    odjel_id,
    tip_sobe_id,
  });

  return response.data;
};

export const deleteSoba = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};