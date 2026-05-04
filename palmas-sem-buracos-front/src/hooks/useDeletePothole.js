import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePothole } from "../service/apiClient";

export const useDeletePothole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePothole,

    onSuccess: () => {
      queryClient.invalidateQueries(["potholes"]);
    },
  });
};