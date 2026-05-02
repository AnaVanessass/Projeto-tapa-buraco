import { useQuery } from "@tanstack/react-query";
import { fetchPotholes } from "../service/apiClient";
import { normalizePothole } from "../utils/normalizePothole";

export const usePotholes = () => {
  return useQuery({
    queryKey: ["potholes"],
    queryFn: fetchPotholes,
    select: (data) => data.map(normalizePothole),
  });
};
