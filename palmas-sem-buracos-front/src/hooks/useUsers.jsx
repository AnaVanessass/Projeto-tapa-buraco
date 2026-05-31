import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { changeUserPermission, deleteUser, searchUsers } from '../service/userService';

export const useSearchUsers = (filters) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => searchUsers(filters),
    placeholderData: (keepPreviousData) => keepPreviousData,
  });
};

export const useChangeUserPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeUserPermission,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: () => alert("Erro ao alterar permissão do usuário.")
  });
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("Usuário removido com sucesso!");
    },
    onError: () => alert("Erro ao remover usuário.")
  });
};
