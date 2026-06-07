import api from "./apiClient";

export const searchUsers = async (filters) => {
    const { data } = await api.get("/users/", {
    params: {
        search: filters?.search || undefined,
        page: filters?.page || 0,
        size: filters?.size || 10,
    }
    });
    return data;
};

export const changeUserPermission = async ({ id, role }) => {
    const {data} = await api.patch(`/users/${id}/role`, role, {
        headers: { 'Content-Type': 'application/json' }
    });
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
};