import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { changePotholeStatus, fetchPotholes, createPothole, deletePothole, searchComplaint } from "../service/apiClient";
import { normalizePothole } from "../utils/normalizePothole";


export const usePotholes = () => {
  return useQuery({
    queryKey: ["potholes"],
    queryFn: fetchPotholes,
    select: (data) => data.map(normalizePothole),
  });
};

export const useChangePotholeStatus = () => {
  return useQuery({
    queryKey: ["potholes"],
    queryFn: changePotholeStatus,
    select: (data) => data.map(normalizePothole),
  });
};

export const useCreatePothole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPothole,

    onSuccess: () => {
      queryClient.invalidateQueries(["potholes"]);
    },
  });
};

export const useDeletePothole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePothole,

    onSuccess: () => {
      queryClient.invalidateQueries(["potholes"]);
    },
  });
};

export const useSearchAddress = () => {
  return useQuery({
    queryKey: ["potholes"],
    queryFn: searchComplaint
  });
};
