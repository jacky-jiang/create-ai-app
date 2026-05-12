import { ExampleCard } from "./ExampleCard";
import { useExampleQuery } from "../hooks/use-example-query";
import { useExampleStore } from "../model/example-store";
import { filterActiveItems } from "../services/example-service";

export function ExampleContainer() {
  const { data = [], isLoading, isError, error } = useExampleQuery();
  const selectedId = useExampleStore((state) => state.selectedId);
  const setSelectedId = useExampleStore((state) => state.setSelectedId);
  const activeItems = filterActiveItems(data);

  if (isLoading) {
    return <div className="rounded-2xl border border-slate-800 p-4">Loading example data...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-800 bg-red-950/30 p-4 text-red-200">
        {error instanceof Error ? error.message : "Failed to load example data."}
      </div>
    );
  }

  if (activeItems.length === 0) {
    return <div className="rounded-2xl border border-slate-800 p-4">No active items.</div>;
  }

  return (
    <div className="space-y-3">
      {activeItems.map((item) => (
        <ExampleCard
          key={item.id}
          item={item}
          selected={selectedId === item.id}
          onSelect={setSelectedId}
        />
      ))}
    </div>
  );
}
