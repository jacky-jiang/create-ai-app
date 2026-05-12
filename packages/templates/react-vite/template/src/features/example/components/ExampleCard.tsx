import type { ExampleItem } from "../types/example.types";

interface ExampleCardProps {
  item: ExampleItem;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function ExampleCard({ item, selected, onSelect }: ExampleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected ? "border-cyan-300 bg-cyan-300/10" : "border-slate-700 bg-slate-900"
      }`}
    >
      <p className="font-medium">{item.title}</p>
      <p className="mt-1 text-sm text-slate-400">{item.active ? "Active" : "Inactive"}</p>
    </button>
  );
}
