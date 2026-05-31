import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export const fetchPotholes = async () => {
  const { data } = await api.get("/complaints/");
  return data;
};

export const potholeById = async (id) => {
  const {data} = await api.delete(`/complaints/${id}`);
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

export const changePotholeStatus = async (id, payload) => {
  const {data} = await api.post(`/complaints/${id}`, payload);
  return data;
};

export const fetchBlocks = async () => {
  const {data} = await api.get("/blocks/");
  return data || [];
}

export const searchComplaint = async () => {
  const {data} = await api.get("/complaints/search");
  return data || [];
}

export const addressById = async () => {
  const {data} = await api.get(`/address/${id}`);
  return data || [];
}

export const updateAddressById = async () => {
  const {data} = await api.put(`/address/${id}`);
  return data || [];
}

export const deleteAddressById = async () => {
  const {data} = await api.delete(`/address/${id}`);
  return data || [];
}

export const fetchUsers = async () => {
  const { data } = await api.get("/users/");
  return data;
};

export default api;