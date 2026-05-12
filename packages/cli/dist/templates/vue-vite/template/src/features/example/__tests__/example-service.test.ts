import { describe, expect, it } from "vitest";
import { filterActiveItems } from "../services/example-service";
import type { ExampleItem } from "../types/example.types";

describe("filterActiveItems", () => {
  it("returns only active items", () => {
    const items: ExampleItem[] = [
      { id: "1", title: "Active", active: true },
      { id: "2", title: "Inactive", active: false },
    ];

    expect(filterActiveItems(items)).toEqual([{ id: "1", title: "Active", active: true }]);
  });
});
