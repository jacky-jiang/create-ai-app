import type { ExampleItem } from "../types/example.types";

export function filterActiveItems(items: ExampleItem[]): ExampleItem[] {
  return items.filter((item) => item.active);
}
