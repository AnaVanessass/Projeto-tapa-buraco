import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPothole } from "../service/apiClient";

export const useCreatePothole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPothole,

    onSuccess: () => {
      queryClient.invalidateQueries(["potholes"]);
    },
  });
};