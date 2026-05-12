import { axiosClient } from "../../../shared/api/axios-client";
import type { ExampleItem } from "../types/example.types";

const fallbackItems: ExampleItem[] = [
  { id: "1", title: "Follow layer-based architecture", active: true },
  { id: "2", title: "Keep AI rules synchronized", active: true },
  { id: "3", title: "Avoid broad unrelated rewrites", active: false },
];

export async function getExampleItems(): Promise<ExampleItem[]> {
  if (import.meta.env.DEV) {
    return fallbackItems;
  }

  const response = await axiosClient.get<ExampleItem[]>("/examples");
  return response.data;
}
