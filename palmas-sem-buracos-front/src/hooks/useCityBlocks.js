import { useQuery } from "@tanstack/react-query";
import { fetchBlocks } from "../service/potholeService";

export const useCityBlocks = () => {
  return useQuery({
    queryKey: ["cityBlocks"],
    queryFn: fetchBlocks
  });
};