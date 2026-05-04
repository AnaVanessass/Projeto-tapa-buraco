import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export const fetchPotholes = async () => {
  const { data } = await api.get("/complaints/");
  return data;
};

export const createPothole = async (payload) => {
  const { data } = await api.post("/complaints/", payload);
  return data;
};

export const deletePothole = async (id) => {
  const {data} = await api.delete(`/complaints/${id}`);
  return data;
};

export default api;