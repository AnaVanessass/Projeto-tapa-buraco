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

export const changePotholeStatus = async ({id, status}) => {
  const {data} = await api.post(`/complaints/${id}`, {status});
  return data;
};

export const fetchBlocks = async () => {
  const {data} = await api.get("/blocks/");
  return data || [];
}

export const searchComplaint = async (filters) => {
  const {data} = await api.get("/complaints/search", {
        params: {
          address: filters?.address || undefined,
          status: filters?.status || undefined,
          page: filters?.page || 0,
          size: filters?.size || 10,
          sort: 'id,desc'
        }
      });
  return data;
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