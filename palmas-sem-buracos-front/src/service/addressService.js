import api from "./apiClient";

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