import { useQuery } from "@tanstack/react-query";
import { getExampleItems } from "../api/example-api";

export function useExampleQuery() {
  return useQuery({
    queryKey: ["example-items"],
    queryFn: getExampleItems,
  });
}
