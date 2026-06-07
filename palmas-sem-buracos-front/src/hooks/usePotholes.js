import { useQuery, useMutation, useQueryClient, keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { changePotholeStatus, createPothole, deletePothole, searchComplaint, fetchPotholeMarkers, totalsHeader } from "../service/potholeService";
import { normalizePothole } from "../utils/normalizePothole";

export const usePotholes = () => {
  return useQuery({
    queryKey: ["potholes"],
    queryFn: searchComplaint
  });
};

export const useChangePotholeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePotholeStatus,
    onSuccess: () => {queryClient.invalidateQueries(["potholes"]);},
    onError: (error) => {alert("Erro ao atualizar o status. Tente novamente.");},
  });
};

export const useCreatePothole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPothole,
    onSuccess: () => {queryClient.invalidateQueries(["potholes"]);},
  });
};

export const useDeletePothole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePothole,
    onSuccess: () => {
      queryClient.invalidateQueries(["potholes"]);
    },
    onError: (error) => {console.error("Erro na mutação:", error);}
  });
};

export const useSearchAddress = (filters) => {
  return useQuery({
    queryKey: ["potholeDetails", filters],
    queryFn: () => searchComplaint(filters),
    placeholderData: (keepPreviousData) => keepPreviousData,
  });
};

export const usePotholeMarkers = (filters) => {
  return useQuery({
    queryKey: ["potholes", filters],
    queryFn: () => fetchPotholeMarkers(filters),
    placeholderData: (keepPreviousData) => keepPreviousData,
  });
};

export const useInfinitePotholes = (filters) => {
  return useInfiniteQuery({
    queryKey: ["infinitePotholes", filters],

    queryFn: ({ pageParam = 0 }) =>
      searchComplaint({
        ...filters,
        page: pageParam,
      }),

    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;

      return lastPage.number + 1;
    },

    initialPageParam: 0,
  });
};

export const useTotalsHeader = () => {
  return useQuery({
    queryKey: ["potholeTotals"],
    queryFn: () => totalsHeader(),
    placeholderData: (keepPreviousData) => keepPreviousData,
  });
};